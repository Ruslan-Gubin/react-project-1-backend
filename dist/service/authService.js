import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/index.js';
import { cloudinary } from '../utils/cloudinary.js';
class AuthService {
    constructor(model) {
        this.model = model;
    }
    getToken(id) {
        return jwt.sign({ _id: id }, process.env.SECRET_TOKEN, {
            expiresIn: '30d',
        });
    }
    async create(body) {
        if (!body) {
            throw new Error('Не получены данные нового пользователя');
        }
        const pas = body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordBcrypt = await bcrypt.hash(pas, salt);
        const image = body.imag;
        const resImage = await cloudinary.uploader.upload(image, {
            folder: 'Users',
        });
        const newUser = await new this.model({
            ...body,
            image: { public_id: resImage.public_id, url: resImage.secure_url },
            passwordHash: passwordBcrypt,
        }).save();
        const token = this.getToken(newUser._id);
        const { passwordHash, ...userData } = newUser._doc;
        return { ...userData, token };
    }
    async login(body) {
        if (!body.email) {
            throw new Error('Не найден E-Mail пользователя');
        }
        const user = await this.model.findOne({ email: body.email });
        if (!user) {
            throw new Error('Неверный логин или пароль');
        }
        const isValidPass = user._doc.passwordHash && bcrypt.compare(body.password, user._doc.passwordHash);
        if (!isValidPass) {
            throw new Error('Неверный логин или пароль');
        }
        const token = this.getToken(user._id);
        const { passwordHash, ...userData } = user._doc;
        return { ...userData, token };
    }
    async getUser(userId) {
        if (!userId) {
            throw new Error('Пользователь не найден');
        }
        const user = await this.model.findById(userId);
        if (user) {
            const { passwordHash, ...userData } = user._doc;
            return userData;
        }
        else {
            throw new Error('no found user');
        }
    }
    async getUserSinglPage(id) {
        if (!id) {
            throw new Error('Id пользователя не найден');
        }
        const user = await this.model.findById(id);
        if (user) {
            const { passwordHash, ...userData } = user._doc;
            return userData;
        }
        else {
            throw new Error('Пользователь не найден');
        }
    }
    async getAllUsers(query) {
        const searchFullname = query.userFullName;
        if (searchFullname.length === 0) {
            return [];
        }
        const users = await this.model
            .find({ fullName: { $regex: `${searchFullname}`, $options: 'i' } })
            .sort({ createdAt: -1 });
        return users;
    }
    async setFriendRequest(body) {
        if (body.user._id && body.guest) {
            throw new Error('Не указан ID гостя или пользователя');
        }
        const userId = body.user._id;
        const requestFriendsArr = body.user.requestFriends;
        const guestId = body.guest;
        if (requestFriendsArr.includes(guestId)) {
            const user = await this.model.findOneAndUpdate({ _id: userId }, {
                requestFriends: requestFriendsArr.filter((item) => item !== guestId),
            }, { returnDocument: 'after' });
            return user;
        }
        else {
            const user = await this.model.findOneAndUpdate({ _id: userId }, { requestFriends: [...requestFriendsArr, guestId] }, { returnDocument: 'after' });
            return user;
        }
    }
    async setRemoveFriendRequest(body) {
        const userId = body.userId;
        const removeId = body.removeId;
        const usersArrId = body.usersArrId;
        return await this.model.findOneAndUpdate({ _id: userId }, { requestFriends: usersArrId.filter((item) => item !== removeId) }, { returnDocument: 'after' });
    }
    async setAddFriend(body) {
        const userId = body.userId;
        const targetId = body.targetId;
        await this.model.updateOne({ _id: userId }, { $addToSet: { friends: targetId }, $pull: { requestFriends: targetId } });
        await this.model.updateOne({ _id: targetId }, { $addToSet: { friends: userId }, $pull: { requestFriends: userId } });
    }
    async setAddDialog(body) {
        const userOneId = body.userOneId;
        const userTwoId = body.userTwoId;
        const dialogId = body.dialogId;
        await this.model.updateOne({ _id: userOneId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: 'after' });
        await this.model.updateOne({ _id: userTwoId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: 'after' });
    }
    async setDeleteDialog(userOneId, userTwoId, dialogId) {
        try {
            await this.model.updateOne({ _id: userOneId }, { $pull: { dialogs: dialogId } }, { returnDocument: 'after' });
            await this.model.updateOne({ _id: userTwoId }, { $pull: { dialogs: dialogId } }, { returnDocument: 'after' });
        }
        catch (error) {
            console.log(error);
        }
    }
    async setDeleteFriend(body) {
        if (!body.userId && !body.guest) {
            throw new Error('Не указан ID пользователя или гостя');
        }
        const userId = body.userId;
        const guestId = body.guest;
        await this.model.updateOne({ _id: userId }, { $pull: { friends: guestId } }, { returnDocument: 'after' });
        await this.model.updateOne({ _id: guestId }, { $pull: { friends: userId } }, { returnDocument: 'after' });
    }
    async setAuthOnline(body, userId) {
        const status = body.status;
        if (status !== false && status !== true) {
            throw new Error('Не удалось получить статус пользователя');
        }
        await this.model.updateOne({ _id: userId }, { $set: { online: status } });
        return status;
    }
    async getUsersLikes(query) {
        const usersId = query.usersIdArr;
        if (!usersId) {
            throw new Error('запашиваемые пользователи не найдены');
        }
        const userArrId = usersId.split(',');
        const users = await this.model.find({ _id: { $in: userArrId } }, { image: true });
        return users;
    }
    async getUsersArray(query) {
        if (!query) {
            throw new Error('запашиваемые пользователи не найдены');
        }
        const limit = query.limit;
        const usersId = query.arr;
        const userArrId = usersId.split(',');
        const users = await this.model.find({ _id: { $in: userArrId } }, { passwordHash: false }).limit(limit);
        return users;
    }
    async remove(id) {
        const idAuth = id;
        const auth = await this.model.findByIdAndDelete(idAuth);
        if (auth) {
            const imageId = auth.image.public_id;
            await cloudinary.uploader.destroy(imageId);
            return { success: true, message: `${auth.fullName} user deleted` };
        }
        else {
            throw new Error('Не удалось удалить пользователя и фото');
        }
    }
    async getAllEmail() {
        const emails = await this.model.find({}, { email: true, _id: false });
        const result = emails.map((item) => item.email);
        return result;
    }
    async update(body) {
        const idAuth = body.id;
        const pas = body.password;
        const salt = await bcrypt.genSalt(7);
        const passwordBcrypt = await bcrypt.hash(pas, salt);
        const prevAuth = await this.model.findOne({ _id: idAuth });
        const prevImage = prevAuth === null || prevAuth === void 0 ? void 0 : prevAuth.image;
        if (body.imag === body.prevImage) {
            return await this.model.updateOne({ _id: idAuth }, { ...body, passwordHash: passwordBcrypt, image: prevImage }, { returnDocument: 'after' });
        }
        else if ((prevImage === null || prevImage === void 0 ? void 0 : prevImage.url) !== body.imag) {
            const imgId = prevAuth === null || prevAuth === void 0 ? void 0 : prevAuth.image.public_id;
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }
            const newAvatar = body.imag;
            const result = await cloudinary.uploader.upload(newAvatar, {
                folder: 'Users',
                fetch_format: 'auto',
            });
            return await this.model.updateOne({ _id: idAuth }, {
                ...body,
                passwordHash: passwordBcrypt,
                image: { public_id: result.public_id, url: result.secure_url },
            }, { returnDocument: 'after' });
        }
    }
}
export const authService = new AuthService(userModel);

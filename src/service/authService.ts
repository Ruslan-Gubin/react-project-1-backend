import { Model, UpdateWriteOpResult } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/index.js';
import { cloudinary } from '../utils/cloudinary.js';
import * as types from '../types/userType/index.js';

class AuthService {
  constructor(private readonly model: Model<types.IUser>) {}

  private getToken(id: string) {
    return jwt.sign({ _id: id }, process.env.SECRET_TOKEN as string, {
      expiresIn: '30d',
    });
  }

  async create(body: types.CreatedUserBody): Promise<types.IUser> {
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

  async login(body: types.AuthorizationUserBody): Promise<types.IUser> {
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

  async getUser(userId: string): Promise<types.IUser> {
    if (!userId) {
      throw new Error('Пользователь не найден');
    }

    const user = await this.model.findById(userId);

    if (user) {
      const { passwordHash, ...userData } = user._doc;

      return userData;
    } else {
      throw new Error('no found user');
    }
  }

  async getUserSinglPage(id: string): Promise<types.IUser> {
    if (!id) {
      throw new Error('Id пользователя не найден');
    }

    const user = await this.model.findById(id);

    if (user) {
      const { passwordHash, ...userData } = user._doc;
      return userData;
    } else {
      throw new Error('Пользователь не найден');
    }
  }

  async getAllUsers(query: { userFullName: string }): Promise<types.IUser[]> {
    const searchFullname = query.userFullName;

    if (searchFullname.length === 0) {
      return [];
    }

    const users = await this.model
      .find({ fullName: { $regex: `${searchFullname}`, $options: 'i' } })
      .sort({ createdAt: -1 });

    return users;
  }

  async setFriendRequest(body: types.AddFriendRequestUserBody) {
    if (!body.user._id && !body.guest) {
      throw new Error('Не указан ID гостя или пользователя');
    }
    const userId = body.user._id;
    const requestFriendsArr = body.user.requestFriends;
    const guestId = body.guest;

    if (requestFriendsArr.includes(guestId)) {
      const user = await this.model.findOneAndUpdate(
        { _id: userId },
        {
          requestFriends: requestFriendsArr.filter((item) => item !== guestId),
        },
        { returnDocument: 'after' },
      );
      return user;
    } else {
      const user = await this.model.findOneAndUpdate(
        { _id: userId },
        { requestFriends: [...requestFriendsArr, guestId] },
        { returnDocument: 'after' },
      );
      return user;
    }
  }

  async setRemoveFriendRequest(body: types.RemoveUserRequestBody): Promise<any> {
    const userId = body.userId;
    const removeId = body.removeId;
    const usersArrId = body.usersArrId;

    return await this.model.findOneAndUpdate(
      { _id: userId },
      { requestFriends: usersArrId.filter((item) => item !== removeId) },
      { returnDocument: 'after' },
    );
  }

  async setAddFriend(body: types.AddFriendUserBody) {
    const userId = body.userId;
    const targetId = body.targetId;

    await this.model.updateOne(
      { _id: userId },
      { $addToSet: { friends: targetId }, $pull: { requestFriends: targetId } },
    );
    await this.model.updateOne(
      { _id: targetId },
      { $addToSet: { friends: userId }, $pull: { requestFriends: userId } },
    );
  }

  async setAddDialog(body: types.CreateDialogUserBody) {
    const userOneId = body.userOneId;
    const userTwoId = body.userTwoId;
    const dialogId = body.dialogId;

    await this.model.updateOne({ _id: userOneId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: 'after' });
    await this.model.updateOne({ _id: userTwoId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: 'after' });
  }

  async setDeleteDialog(userOneId: string, userTwoId: string, dialogId: string) {
    try {
      await this.model.updateOne({ _id: userOneId }, { $pull: { dialogs: dialogId } }, { returnDocument: 'after' });
      await this.model.updateOne({ _id: userTwoId }, { $pull: { dialogs: dialogId } }, { returnDocument: 'after' });
    } catch (error) {
      console.log(error);
    }
  }

  async setDeleteFriend(body: types.RemoveFriendUserBody) {
    if (!body.userId && !body.guest) {
      throw new Error('Не указан ID пользователя или гостя');
    }
    const userId = body.userId;
    const guestId = body.guest;

    await this.model.updateOne({ _id: userId }, { $pull: { friends: guestId } }, { returnDocument: 'after' });
    await this.model.updateOne({ _id: guestId }, { $pull: { friends: userId } }, { returnDocument: 'after' });
  }

  async setAuthOnline(body: { status: boolean }, userId: string): Promise<boolean> {
    const status = body.status;
    if (status !== false && status !== true) {
      throw new Error('Не удалось получить статус пользователя');
    }
    await this.model.updateOne({ _id: userId }, { $set: { online: status } });
    return status;
  }

  async getUsersLikes(query: { usersIdArr: string }): Promise<types.IUser[]> {
    const usersId = query.usersIdArr; // req - string 'id,id,id'
    if (!usersId) {
      throw new Error('запашиваемые пользователи не найдены');
    }
    const userArrId = usersId.split(',');
    const users = await this.model.find({ _id: { $in: userArrId } }, { image: true });
    return users;
  }

  async getUsersArray(query: types.GetUsersArrayQuery): Promise<types.IUser[]> {
    if (!query) {
      throw new Error('запашиваемые пользователи не найдены');
    }
    const limit = query.limit;
    const usersId = query.arr; // req - string 'id,id,id'
    const userArrId = usersId.split(',');
    const users = await this.model.find({ _id: { $in: userArrId } }, { passwordHash: false }).limit(limit);
    return users;
  }

  async remove(id: string): Promise<{ success: boolean; message: string }> {
    const idAuth = id;
    const auth = await this.model.findByIdAndDelete(idAuth);

    if (auth) {
      const imageId = auth.image.public_id;
      await cloudinary.uploader.destroy(imageId);

      return { success: true, message: `${auth.fullName} user deleted` };
    } else {
      throw new Error('Не удалось удалить пользователя и фото');
    }
  }

  async getAllEmail(): Promise<string[]> {
    const emails = await this.model.find({}, { email: true, _id: false });
    const result = emails.map((item) => item.email);
    return result;
  }

  async update(body: types.UpdateUserBody): Promise<UpdateWriteOpResult | undefined> {
    const idAuth = body.id;
    const pas = body.password;
    const salt = await bcrypt.genSalt(7);
    const passwordBcrypt = await bcrypt.hash(pas, salt);

    const prevAuth = await this.model.findOne({ _id: idAuth });
    const prevImage = prevAuth?.image; //find prev image user

    if (body.imag === body.prevImage) {
       return await this.model.updateOne(
        { _id: idAuth },
        { ...body, passwordHash: passwordBcrypt, image: prevImage },
        { returnDocument: 'after' },
      );
    } else if (prevImage?.url !== body.imag) {
      const imgId = prevAuth?.image.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId); // remove prev avatar
      }

      const newAvatar = body.imag;
      const result = await cloudinary.uploader.upload(newAvatar, {
        folder: 'Users',
        fetch_format: 'auto',
      });

      return await this.model.updateOne(
        { _id: idAuth },
        {
          ...body,
          passwordHash: passwordBcrypt,
          image: { public_id: result.public_id, url: result.secure_url },
        },
        { returnDocument: 'after' },
      );
    } 
  }
  
}

export const authService = new AuthService(userModel);

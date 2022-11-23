import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";

class AuthService {
  constructor(options) {
    this.model = options.model;
  }

  getToken(id) {
    return jwt.sign({ _id: id }, process.env.SECRET_TOKEN, {
      expiresIn: "30d",
    });
  }

  async create(req) {
    const pas = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordBcrypt = await bcrypt.hash(pas, salt);

    const image = req.body.image;
    const resImage = await cloudinary.uploader.upload(image, {
      folder: "Users",
    });

    const newUser = await this.model({
      ...req.body,
      image: { public_id: resImage.public_id, url: resImage.secure_url },
      passwordHash: passwordBcrypt,
    });

    const user = await newUser.save();

    const token = this.getToken(user._id);

    const { passwordHash, ...userData } = user._doc;

    return { ...userData, token };
  }

  async login(req, res) {
    if (!req.body.email) {
      throw new Error("Не найден E-Mail пользователя");
    }
    const user = await this.model.findOne({ email: req.body.email });

    if (!user) {
      throw new Error("Неверный логин или пароль");
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      throw new Error("Неверный логин или пароль");
    }

    const token = this.getToken(user._id);

    const { passwordHash, ...userData } = user._doc;

    return { ...userData, token };
  }

  async getUser(req) {
    if (!req.userId) {
      throw new Error("Пользователь не найден");
    }

    const user = await this.model.findById(req.userId);

    const { passwordHash, ...userData } = user._doc;

    return userData;
  }

  async getUserSinglPage(req) {
    const id = req.params.id;
    if (!id) {
      throw new Error("Пользователь не найден");
    }

    const user = await this.model.findById(id);

    const { passwordHash, ...userData } = user._doc;

    return userData;
  }

  async getAllUsers(req) {
    const users = await this.model.find().sort({ createdAt: -1 });
    return users;
  }

  async setFriendRequest(req) {
    if (req.body.targerId && req.body.guest) {
      throw new Error("Не указан ID гостя или пользователя");
    }
    const userId = req.body.user._id;
    const requestFriendsArr = req.body.user.requestFriends;
    const guestId = req.body.guest;

    if (requestFriendsArr.includes(guestId)) {
      const user = await this.model.findOneAndUpdate(
        { _id: userId },
        {
          requestFriends: requestFriendsArr.filter((item) => item !== guestId),
        },
        { returnDocument: "after" }
      );
      return user;
    } else {
      const user = await this.model.findOneAndUpdate(
        { _id: userId },
        { requestFriends: [...requestFriendsArr, guestId] },
        { returnDocument: "after" }
      );
      return user;
    }
  }

  async setRemoveFriendRequest(req) {
    const userId = req.body.userId;
    const removeId = req.body.removeId;
    const usersArrId = req.body.usersArrId;

    return await this.model.findOneAndUpdate(
      { _id: userId },
      { requestFriends: usersArrId.filter((item) => item !== removeId) },
      { returnDocument: "after" }
    );
  }

  async setAddFriend(req) {
    const userId = req.body.userId;
    const targetId = req.body.targetId;

    await this.model.updateOne(
      { _id: userId },
      { $addToSet: { friends: targetId },$pull: {requestFriends: targetId}  },
      );
      await this.model.updateOne(
        { _id: targetId },
        { $addToSet: { friends: userId },$pull: {requestFriends: userId} },
        );
  }

  async setAddDialog(req) {
    const userOneId = req.body.userOneId
    const userTwoId = req.body.userTwoId
    const dialogId = req.body.dialogId  

    await this.model.updateOne(
      { _id: userOneId },
      { $addToSet: { dialogs: dialogId }  },
      { returnDocument: "after" }
      );
      await this.model.updateOne(
        { _id: userTwoId },
        { $addToSet: { dialogs: dialogId } },
        { returnDocument: "after" }
        );
  }

  async setDeleteFriend(req) {
    if (!req.body.userId && !req.body.guest) {
      throw new Error('Не указан ID пользователя или гостя')
    }
    
    const userId = req.body.userId
    const guestId = req.body.guest


    await this.model.updateOne(
      { _id: userId },
      { $pull: {friends: guestId}  },
      );
      await this.model.updateOne(
        { _id: guestId },
        { $pull: {friends: userId} },
        );
  }

  async setAuthOnline(req) { 
    const status = req.body.status
    console.log(status);
    if (status !== false && status !== true) {
      throw new Error('Не удалось получить статус пользователя')
    }
     await this.model.updateOne(    
      {_id: req.userId},
      {$set: {online: status}}
      )
      return status
  }

  async getUsersLikes(req) {
    const usersId = await req.query.usersIdArr; // req - string 'id,id,id'
    if (!usersId) {
      throw new Error("запашиваемые пользователи не найдены");
    }
    const userArrId = usersId.split(",");
    const users = await this.model.find(
      { _id: { $in: userArrId } },
      { image: true }
    );
    return users;
  }

  async getUsersArray(req) {
    const limit = req.query.limit
    const usersId = await req.query.arr; // req - string 'id,id,id'
    if (!usersId) {
      throw new Error("запашиваемые пользователи не найдены");
    }
    const userArrId = usersId.split(",");
    const users = await this.model.find(
      { _id: { $in: userArrId } },
      { image: true, fullName: true }
    ).limit(limit);
    return users;
  }

  async remove(req) {
    try {
      const idAuth = req.query.id;
      const auth = await this.model.findByIdAndDelete(idAuth);

      const imageId = auth.image.public_id;
      await cloudinary.uploader.destroy(imageId);

      return { success: true, message: "user deleted" };
    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllEmail() {
    const result = [];
    const emails = await this.model.find({}, { email: true, _id: false });
    emails.forEach((item) => result.push(item.email));
    return result;
  }

  async update(req) {
    const idAuth = req.body.id;
    const pas = req.body.password;
    const salt = await bcrypt.genSalt(7);
    const passwordBcrypt = await bcrypt.hash(pas, salt);

    const prevAuth = await this.model.findOne({ _id: idAuth });
    const prevImage = await prevAuth.image; //find prev image user

    if (req.body.image === req.body.prevImage) {
      return await this.model.updateOne(
        { _id: idAuth },
        { ...req.body, passwordHash: passwordBcrypt, image: prevImage }
      );
    } else if (prevImage.url !== req.body.image) {
      const imgId = await prevAuth.image.public_id;
      await cloudinary.uploader.destroy(imgId); // remove prev avatar

      const newAvatar = await req.body.image;
      const result = await cloudinary.uploader.upload(newAvatar, {
        folder: "Users",
        fetch_format: "auto",
      });

      return await this.model.updateOne(
        { _id: idAuth },
        {
          ...req.body,
          passwordHash: passwordBcrypt,
          image: { public_id: result.public_id, url: result.secure_url },
        }
      );
    }
  }
}

export const authService = new AuthService({ model: userModel });

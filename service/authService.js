import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";


class AuthService {
constructor(options) {
  this.model = options.model
}

  getToken(id) {
  return  jwt.sign({ _id: id }, process.env.SECRET_TOKEN, {
     expiresIn: "30d",
   });
  };

  async create(req) {
    const pas = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordBcrypt = await bcrypt.hash(pas, salt);
    
    const image =  req.body.image
    const resImage = await cloudinary.uploader.upload(image, {
      folder: 'Users',
    }); 

    const newUser = await this.model({
      ...req.body,
      image: {public_id: resImage.public_id, url: resImage.secure_url},
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
    const user = await userModel.findOne({ email: req.body.email });

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

    const user = await userModel.findById(req.userId);

    const { passwordHash, ...userData } = user._doc;

    return userData;
  }

  async getAllUsers() {
    const users = await userModel.find().sort({createdAt: -1});
    return users;
  }

  async remove(req) {
    return await userModel.findByIdAndDelete(req.params.id);
  }

  async update(req) {
    const pas = req.body.password;
    const salt = await bcrypt.genSalt(7);
    const passwordBcrypt = await bcrypt.hash(pas, salt);

    const userUpdate = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        email: req.body.email,
        passwordHash: passwordBcrypt,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
      }
    );

    const token = this.getToken(userUpdate._id);

    const { passwordHash, ...userData } = userUpdate._doc;

    return { ...userData, token };
  }
}

export const authService = new AuthService({model: userModel});

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

  async getAllUsers() {
    const users = await this.model.find().sort({ createdAt: -1 });
    return users;
  }

  async remove(req) {
    try {
      const idAuth = req.query.id
      const auth = await this.model.findByIdAndDelete(idAuth)

      const imageId = auth.image.public_id
      await cloudinary.uploader.destroy(imageId)

      return ({success: true, message: 'user deleted'})

    } catch (error) {
      console.log(error.message);
    }
  }

  async getAllEmail() {
    const result = []
    const emails = await this.model.find({},{email: true,_id: false})
    emails.forEach(item => result.push(item.email))
    return result
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

import {userModel} from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async createUser(req, res) {
    try {
      const { fullName, email, avatarUrl, password } = req.body;

      const pas = password;
      const salt = await bcrypt.genSalt(10);
      const passwordBcrypt = await bcrypt.hash(pas, salt);

      const newUser = new userModel({
        fullName,
        email,
        avatarUrl,
        passwordHash: passwordBcrypt,
      });
      const user = await newUser.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Не удалось создать пользователя" });
    }
  }

  async authorization(req, res) {
    try {
      const user = await userModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          massage: "Пользователь не найден",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return res.status(400).json({
          massage: "Неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Не удалось авторизоватся" });
    }
  }

  async getInforUsers(req, res) {
    try {
      const user = await userModel.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const { passwordHash, ...userData } = user._doc;

      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        massage: "Нет доступа",
      });
    }
  }
}

export const authController = new AuthController();

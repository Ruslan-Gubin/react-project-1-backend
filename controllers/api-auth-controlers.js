import { authService } from "../service/authService.js";
import {  handleError } from "../utils/index.js";

class AuthController {
  async createUser(req, res) {
    await authService
      .create(req)
      .then((user) => res.status(201).json(user))
      .catch((error) =>
        handleError(res, error, "Не удалось создать пользователя")
      );
  }

  async authorization(req, res) {
    await authService.login(req,res) 
    .then((user) => res.status(200).json(user))
    .catch((error) =>handleError(res, error, "Не удалось авторизоватся"));
  }

  async getUserInfo(req, res) {
    await authService
      .getUser(req)
      .then((user) => res.status(200).json(user))
      .catch((error) => handleError(res, error, "Пользователь не найден"));
  }

  async getAllUsers(req, res) {
    await authService
      .getAllUsers()
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, "Пользователь не найден"));
  }

  async removeUser(req, res) {
    await authService
      .remove(req)
      .then(() => res.status(200).json(req.params.id))
      .catch((error) =>
        handleError(res, error, "Пользователя не удалось удалить")
      );
  }

  async updateUser(req, res) {
    await authService
      .update(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось изменить")
      );
  }
}

export const authController = new AuthController(); 

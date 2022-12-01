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
      .getAllUsers(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, "Пользователи не найдены"));
  }

  async getUserSinglPage(req, res) {
    await authService
      .getUserSinglPage(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, "Пользователь не найден"));
  }

  async getUsersLikes(req, res) {
    await authService
      .getUsersLikes(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, "Пользователи не найдены"));
  }

  async getUsersArray(req, res) {
    await authService
      .getUsersArray(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, "Пользователи не найдены"));
  }

  async removeUser(req, res) {
    await authService
      .remove(req)
      .then((data) => res.status(200).json({...data}))
      .catch((error) =>
        handleError(res, error, "Пользователя не удалось удалить")
      );
  }

  async getEmails(req, res) {
    await authService.getAllEmail()
    .then((data) => res.status(200).json(data))
    .catch((error) => handleError(res, error, "Не удалось найти все Email")); 
  }

  async updateUser(req, res) {
    await authService
      .update(req)
      .then(() => res.status(200).json({success: true, ...req.body}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось изменить")
      );
  }

  async setRemoveFriendRequest(req, res) {
    await authService
      .setRemoveFriendRequest(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось удалить из запросов в друзья")
      );
  }

  async setAddFriend(req, res) {
    await authService
      .setAddFriend(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось добавить в друзья")
      );
  }

  async setDeleteFriend(req, res) {
    await authService
      .setDeleteFriend(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось удалить из друзей")
      );
  }

  async setAddDialog(req, res) {
    await authService
      .setAddDialog(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователю не удалось добавить диалог")
      );
  }

  async setAuthOnline(req, res) {
    await authService
      .setAuthOnline(req)
      .then((status) => res.status(200).json({status}))
      .catch((error) => 
        handleError(res, error, "Не удалось передать статус активности")
      );
  }

  async setFriendRequest(req, res) {
    await authService
      .setFriendRequest(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось добавить в массив запрос друзей")
      );
  }
}

export const authController = new AuthController(); 

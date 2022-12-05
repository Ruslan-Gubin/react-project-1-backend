import * as express from 'express';
import { authService } from "../service/authService.js";
import {  handleError } from "../utils/index.js";

class AuthController {
  async createUser(req: express.Request, res: express.Response) {
    await authService
      .create(req)
      .then((user) => res.status(201).json(user))
      .catch((error) =>
        handleError(res, error, "Не удалось создать пользователя")
      );
  }

  async authorization(req: express.Request, res: express.Response) {
    await authService.login(req, res) 
    .then((user) => res.status(200).json(user))
    .catch((error) =>handleError(res, error, "Не удалось авторизоватся"));
  }

  async getUserInfo(req: express.Request, res: express.Response) {
    await authService
      .getUser(req)
      .then((user) => res.status(200).json(user))
      .catch((error) => handleError(res, error, "Пользователь не найден"));
  }

  async getAllUsers(req: express.Request, res: express.Response) {
    await authService
      .getAllUsers(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, "Пользователи не найдены"));
  }

  async getUserSinglPage(req: express.Request, res: express.Response) {
    await authService
      .getUserSinglPage(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, "Пользователь не найден"));
  }

  async getUsersLikes(req: express.Request, res: express.Response) {
    await authService
      .getUsersLikes(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, "Пользователи не найдены"));
  }

  async getUsersArray(req: express.Request, res: express.Response) {
    await authService
      .getUsersArray(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, "Пользователи не найдены"));
  }

  async removeUser(req: express.Request, res: express.Response) {
    await authService
      .remove(req)
      .then((data) => res.status(200).json({...data}))
      .catch((error) =>
        handleError(res, error, "Пользователя не удалось удалить")
      );
  }

  async getEmails(req: express.Request, res: express.Response) {
    await authService.getAllEmail()
    .then((data) => res.status(200).json(data))
    .catch((error) => handleError(res, error, `Не удалось найти все Email ${req}`)); 
  }

  async updateUser(req: express.Request, res: express.Response) {
    await authService
      .update(req)
      .then(() => res.status(200).json({success: true, ...req.body}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось изменить")
      );
  }

  async setRemoveFriendRequest(req: express.Request, res: express.Response) {
    await authService
      .setRemoveFriendRequest(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось удалить из запросов в друзья")
      );
  }

  async setAddFriend(req: express.Request, res: express.Response) {
    await authService
      .setAddFriend(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось добавить в друзья")
      );
  }

  async setDeleteFriend(req: express.Request, res: express.Response) {
    await authService
      .setDeleteFriend(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось удалить из друзей")
      );
  }

  async setAddDialog(req: express.Request, res: express.Response) {
    await authService
      .setAddDialog(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователю не удалось добавить диалог")
      );
  }

  async setAuthOnline(req: express.Request, res: express.Response) {
    await authService
      .setAuthOnline(req)
      .then((status) => res.status(200).json({status}))
      .catch((error) => 
        handleError(res, error, "Не удалось передать статус активности")
      );
  }

  async setFriendRequest(req: express.Request, res: express.Response) {
    await authService
      .setFriendRequest(req)
      .then(() => res.status(200).json({success: true}))
      .catch((error) => 
        handleError(res, error, "Пользователя не удалось добавить в массив запрос друзей")
      );
  }
}

export const authController = new AuthController(); 

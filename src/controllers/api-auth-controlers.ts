import { Response, Request } from 'express';
import { authService } from '../service/authService.js';
import { handleError } from '../utils/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import * as types from '../types/userType/index.js';

class AuthController {
  async createUser(req: IRequestBody<types.CreatedUserBody>, res: Response<types.IUser>) {
    const body = req.body;
    await authService
      .create(body)
      .then((user) => res.status(201).json(user))
      .catch((error) => handleError(res, error, 'Не удалось создать пользователя'));
  }

  async authorization(req: IRequestBody<types.AuthorizationUserBody>, res: Response<types.IUser>) {
    const body = req.body;
    await authService
      .login(body)
      .then((user) => res.status(200).json(user))
      .catch((error) => handleError(res, error, 'Не удалось авторизоватся')); 
  }

  async getUserInfo(req: Request, res: Response<types.IUser>) {
    //@ts-ignore start
    const userId = req.userId;
    //@ts-ignore end
    await authService
      .getUser(userId)
      .then((user) => res.status(200).json(user))
      .catch((error) => handleError(res, error, 'Пользователь не найден'));
  }

  async getAllUsers(req: IRequestQuery<{ userFullName: string }>, res: Response<types.IUser[]>) {
    const query = req.query;
    await authService
      .getAllUsers(query)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, 'Пользователи не найдены'));
  }

  async getUserSinglPage(req: IRequestParams<{ id: string }>, res: Response<types.IUser>) {
    const id = req.params.id;
    await authService
      .getUserSinglPage(id)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error, 'Пользователь не найден'));
  }

  async getUsersLikes(req: IRequestQuery<{ usersIdArr: string }>, res: Response) {
    const query = req.query;
    await authService
      .getUsersLikes(query)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, 'Пользователи не найдены'));
  }

  async getUsersArray(req: IRequestQuery<types.GetUsersArrayQuery>, res: Response<types.IUser[]>) {
    const query = req.query;
    await authService
      .getUsersArray(query)
      .then((users) => res.status(200).json(users))
      .catch((error) => handleError(res, error.message, 'Пользователи не найдены'));
  }

  async removeUser(req: IRequestQuery<{ id: string }>, res: Response) {
    const id = req.query.id;
    await authService
      .remove(id)
      .then((data) => res.status(200).json({ ...data }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось удалить'));
  }

  async getEmails(req: Request, res: Response<string[]>) {
    await authService
      .getAllEmail()
      .then((data) => res.status(200).json(data))
      .catch((error) => handleError(res, error, `Не удалось найти все Email ${req}`));
  }

  async updateUser(req: IRequestBody<types.UpdateUserBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .update(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось изменить'));
  }

  async setRemoveFriendRequest(req: IRequestBody<types.RemoveUserRequestBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .setRemoveFriendRequest(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось удалить из запросов в друзья'));
  }

  async setAddFriend(req: IRequestBody<types.AddFriendUserBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .setAddFriend(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось добавить в друзья'));
  }

  async setDeleteFriend(req: IRequestBody<types.RemoveFriendUserBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .setDeleteFriend(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось удалить из друзей'));
  }

  async setAddDialog(req: IRequestBody<types.CreateDialogUserBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .setAddDialog(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователю не удалось добавить диалог'));
  }

  async setAuthOnline(req: IRequestBody<{ status: boolean }>, res: Response<boolean>) {
    const body = req.body;
    //@ts-ignore start
    const userId = req.userId;
    //@ts-ignore end
    await authService
      .setAuthOnline(body, userId)
      .then((status) => res.status(200).json(status))
      .catch((error) => handleError(res, error, 'Не удалось передать статус активности'));
  }

  async setFriendRequest(req: IRequestBody<types.AddFriendRequestUserBody>, res: Response<{ success: boolean }>) {
    const body = req.body;
    await authService
      .setFriendRequest(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Пользователя не удалось добавить в массив запрос друзей'));
  }
}

export const authController = new AuthController();

import * as express from 'express';
import { handleError } from "../utils/index.js";
import { dialogService } from "../service/index.js";

class DialogController {
  async createDialog(req: express.Request, res: express.Response) {
    await dialogService.createDialog(req)
    .then((dialog) => res.status(201).json(dialog))
    .catch((error) => handleError(res, error.message, "Не удалось создать диалог"));
  }
  
  async getOneDialog(req: express.Request, res: express.Response) {
    await dialogService
    .getOneDialog(req)
    .then((dialog) => res.status(200).json(dialog))
    .catch((error) => handleError(res, error.message, "Диалог не найден"));
  }
  
  async setAddComment(req: express.Request, res: express.Response) {
    await dialogService
    .setAddComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось добавить комментарий"));
  }
  
  async setRemoveComment(req: express.Request, res: express.Response) {
    await dialogService
    .setRemoveComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось удалить комментарий"));
  }

  async setDeleteDialog(req: express.Request, res: express.Response) {
    await dialogService
      .setDeleteDialog(req)
      .then((message) => res.status(200).json(message))
      .catch((error) => handleError(res, error.message, "Не удалось удалить диалог"));
  }

}

export const dialogController = new DialogController();
import { commentModel } from "../models/comments.js";
import { commentService } from "../service/commentService.js";
import { handleError } from "../service/handlerError.js";

class CommentController {
  async create(req, res) {
    await commentService
      .create(req)
      .then((comments) => res.status(201).json(comments))
      .catch((error) =>
        handleError(res, error, "Ну удалось добавить комментарий")
      );
  }

  async getAll(req, res) {
    await commentService
      .getAll()
      .then((comments) => res.status(200).json(comments))
      .catch((error) =>
        handleError(res, error, "Ну удалось получить все комментарии")
      );
  }

  async getOne(req, res) {
    await commentService
      .getOne(req.params.id)
      .then((comment) => res.status(200).json(comment))
      .catch((error) =>
        handleError(res, error, "Ну удалось получить комментарий")
      );
  }

  async remove(req, res) {
    await commentService
      .remove(req.params.id)
      .then(() => res.status(200).json(req.params.id))
      .catch((error) =>
        handleError(res, error, "Не удалось удалить комментарий")
      );
  }

  async update(req, res) {
    await commentService
      .update(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        handleError(res, error, "Не удалось обновить комментарий")
      );
  }
}

export const commentController = new CommentController();

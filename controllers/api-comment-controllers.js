import { commentService } from "../service/index.js";
import { handleError } from "../utils/index.js";

class CommentController  {

  async create(req, res) {
    await commentService
      .create(req)
      .then((comments) => res.status(201).json(comments)) 
      .catch((error) =>
        handleError(res, error, "Ну удалось добавить комментарий") 
      );
  }  

  async getAll(req, res) {
    await commentService.getAll(req.params.limit)
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
      .remove(req.query.id)
      .then(() => res.status(200).json({success: true}))
      .catch((error) =>
        handleError(res, error, "Не удалось удалить комментарий")
      );
  }

  async update(req, res) {
    await commentService
      .update(req)
      .then((comments) => res.status(200).json(comments))
      .catch((error) =>
        handleError(res, error, "Не удалось обновить комментарий")
      );
  }

  async setAddLike(req, res) {
    await commentService
      .addLike(req)
      .then(() => res.status(201).json({success: true}))
      .catch((error) =>
        handleError(res,"Не удалось поставить лайк", error.message)
      );
  }

  async setAddDislaik(req, res) {
    await commentService
      .addDislaik(req)
      .then(() => res.status(201).json({success: true}))
      .catch((error) =>
        handleError(res,"Не удалось поставить дизлайк", error.message)
      );
  }

}

export const commentController = new CommentController();  

import { commentService } from "../service/index.js";
import { handleError } from "../utils/index.js";
class CommentController {
    async create(req, res) {
        const body = req.body;
        await commentService
            .create(body)
            .then((comments) => res.status(201).json(comments))
            .catch((error) => handleError(res, error, "Ну удалось добавить комментарий"));
    }
    async getAll(req, res) {
        const queryStr = req.query.body;
        await commentService.getAll(queryStr)
            .then((comments) => res.status(200).json(comments))
            .catch((error) => handleError(res, error.message, "Ну удалось получить все комментарии"));
    }
    async getUserComments(req, res) {
        const query = req.query;
        await commentService.getUserComments(query)
            .then((comments) => res.status(200).json(comments))
            .catch((error) => handleError(res, error.message, "Ну удалось получить комментарии пользователя"));
    }
    async getOne(req, res) {
        const id = req.params.id;
        await commentService
            .getOne(id)
            .then((comment) => res.status(200).json(comment))
            .catch((error) => handleError(res, error, "Ну удалось получить комментарий"));
    }
    async remove(req, res) {
        const id = req.query.id;
        await commentService
            .remove(id)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error, "Не удалось удалить комментарий"));
    }
    async update(req, res) {
        const id = req.body.updateId;
        const updateText = req.body.text;
        await commentService
            .update(id, updateText)
            .then((comments) => res.status(200).json(comments))
            .catch((error) => handleError(res, error, "Не удалось обновить комментарий"));
    }
    async setAddLike(req, res) {
        const user = req.userId;
        const body = req.body;
        await commentService
            .addLike(body, user)
            .then(() => res.status(201).json({ success: true }))
            .catch((error) => handleError(res, "Не удалось поставить лайк", error.message));
    }
    async setAddDislaik(req, res) {
        const user = req.userId;
        const body = req.body;
        await commentService
            .addDislaik(body, user)
            .then(() => res.status(201).json({ success: true }))
            .catch((error) => handleError(res, "Не удалось поставить дизлайк", error.message));
    }
}
export const commentController = new CommentController();

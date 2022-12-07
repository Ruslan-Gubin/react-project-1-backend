import { handleError } from '../utils/index.js';
import { dialogService } from '../service/index.js';
class DialogController {
    async createDialog(req, res) {
        const body = req.body;
        await dialogService
            .createDialog(body)
            .then((dialog) => res.status(201).json(dialog))
            .catch((error) => handleError(res, error.message, 'Не удалось создать диалог'));
    }
    async getOneDialog(req, res) {
        const id = req.params.id;
        await dialogService
            .getOneDialog(id)
            .then((dialog) => res.status(200).json(dialog))
            .catch((error) => handleError(res, error.message, 'Диалог не найден'));
    }
    async setAddComment(req, res) {
        const targetId = req.body.targetId;
        const commentId = req.body.commentId;
        await dialogService
            .setAddComment(targetId, commentId)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось добавить комментарий'));
    }
    async setRemoveComment(req, res) {
        await dialogService
            .setRemoveComment(req)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить комментарий'));
    }
    async setDeleteDialog(req, res) {
        const body = req.body;
        await dialogService
            .setDeleteDialog(body)
            .then((message) => res.status(200).json(message))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить диалог'));
    }
}
export const dialogController = new DialogController();

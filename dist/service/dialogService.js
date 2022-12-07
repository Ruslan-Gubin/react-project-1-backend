import { dialogModel } from "../models/index.js";
import { authService } from "./authService.js";
import { commentService } from "./commentService.js";
class DialogService {
    constructor(model) {
        this.model = model;
    }
    async createDialog(body) {
        if (!body) {
            throw new Error("ID одного из пользователей не найдены");
        }
        const userData = body.userOne;
        const targetData = body.userTwo;
        if (userData.dialogs.includes(...targetData.dialogs)) {
            throw new Error("Такой диалог уже существует");
        }
        else {
            const newDialog = await new this.model({
                userOne: userData,
                userTwo: targetData,
            }).save();
            return newDialog;
        }
    }
    async getOneDialog(id) {
        try {
            if (!id) {
                throw new Error("Не найден ID диалога");
            }
            const dialog = await this.model.findById(id);
            if (dialog) {
                return dialog;
            }
            else {
                throw new Error('not found dialog');
            }
        }
        catch (error) {
            throw new Error('not found dialog');
        }
    }
    async setAddComment(targetId, commentId) {
        if (!targetId && !commentId) {
            throw new Error("Не указан ID поста или коментария");
        }
        return await this.model.updateOne({ _id: targetId }, { $push: { comments: commentId } }, { returnDocument: "after" });
    }
    async setRemoveComment(req) {
        const targetId = req.body.targetId;
        const newArrComments = req.body.newArrComments;
        console.log(targetId);
        console.log(req.body);
        if (!targetId && !newArrComments) {
            throw new Error("Не указан ID поста или коментария");
        }
        return await this.model.updateOne({ _id: targetId }, { comments: newArrComments }, { returnDocument: "after" });
    }
    async setDeleteDialog(body) {
        try {
            const dialogId = body.dialogId;
            const userOneId = body.userOneId;
            const userTwoId = body.userTwoId;
            const commentArr = body.commentArr;
            await this.model.findByIdAndDelete(dialogId);
            await commentService.removeCommentsForTarget(commentArr);
            await authService.setDeleteDialog(userOneId, userTwoId, dialogId);
            return { success: true, message: `Dialog: ${dialogId} deleted` };
        }
        catch (error) {
            console.log(error);
        }
    }
}
export const dialogService = new DialogService(dialogModel);

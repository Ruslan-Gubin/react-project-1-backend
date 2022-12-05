import { dialogModel } from "../models/index.js";
import { authService } from "./authService.js";
import { commentService } from "./commentService.js";

class DialogService {
  constructor(options) {
    this.model = options.model;
  }

  async createDialog(req) {
    if (!req.userId && !req.body.targetId) {
      throw new Error("ID одного из пользователей не найдены");
    }

    const userData = req.body.userOne;
    const targetData = req.body.userTwo;

    if (userData.dialogs.includes(...targetData.dialogs)) {
      throw new Error("Такой диалог уже существует");
    } else {
      const newDialog = await this.model({
        userOne: userData,
        userTwo: targetData,
      }).save();

      return newDialog;
    }
  }

  async getOneDialog(req) {
    const id = req.params.id;
    if (!id) {
      throw new Error("Не найден ID диалога");
    }

    const dialog = await this.model.findById(id);

    return dialog;
  }

  async setAddComment(req) {
    const dialogId = req.body.targetId;
    const commentId = req.body.commentId;

    if (!dialogId && !commentId) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: dialogId },
      { $push: { comments: commentId } },
      { returnDocument: "after" }
    );
  }

  async setRemoveComment(req) {
    const targetId = req.body.targetId;
    const newArrComments = req.body.newArrComments;
    console.log(targetId);
    console.log(req.body);
    if (!targetId && !newArrComments) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: targetId },
      { comments: newArrComments },
      { returnDocument: "after" }
    );
  }

  async setDeleteDialog(req) {
    try {
      const dialogId = req.body.dialogId;
      const userOneId = req.body.userOneId;
      const userTwoId = req.body.userTwoId;
      const commentArr = req.body.commentArr;

      await this.model.findByIdAndDelete(dialogId);
      await commentService.removeCommentsForTarget(commentArr);
      await authService.setDeleteDialog(userOneId, userTwoId, dialogId);

      return { success: true, message: `Dialog: ${dialogId} deleted` };
    } catch (error) {
      console.log(error);
    }
  }


}

export const dialogService = new DialogService({ model: dialogModel });

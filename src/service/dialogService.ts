import { Model } from "mongoose";
import { dialogModel } from "../models/index.js";
import {  CreatedDialogBody, IDialog, RemoveDialogBody } from "../types/dialogTypes/index.js";
import { authService } from "./authService.js";
import { commentService } from "./commentService.js";

class DialogService {
  constructor(private readonly model: Model<IDialog>) {}

  async createDialog(body: CreatedDialogBody): Promise<any> {
    if (!body) {
      throw new Error("ID одного из пользователей не найдены");
    }

    const userData = body.userOne;
    const targetData = body.userTwo;

//@ts-ignore start
    if (userData.dialogs.includes(...targetData.dialogs)) {
      //@ts-ignore end
      throw new Error("Такой диалог уже существует");
    } else {
      const newDialog = await new this.model({
        userOne: userData,
        userTwo: targetData,
      }).save();

      return newDialog;
    }
  }

  async getOneDialog(id: string): Promise<IDialog > {
    try {
      if (!id) {
      throw new Error("Не найден ID диалога");
    }

    const dialog = await this.model.findById(id);

    if (dialog ) {
      return dialog;
    } else {
      throw new Error('not found dialog')
    }
    } catch (error) {
      throw new Error('not found dialog')
    }
  } 

  async setAddComment(targetId: string, commentId: string): Promise<any> {
    if (!targetId && !commentId) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: targetId },
      { $push: { comments: commentId } },
      { returnDocument: "after" }
    );
  } 

  async setRemoveComment(req: {body: {targetId:string, newArrComments: string[]}}): Promise<any> {
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

  async setDeleteDialog(body: RemoveDialogBody): Promise<{success: boolean, message: string} | undefined> {
    try {
      const dialogId = body.dialogId;
      const userOneId = body.userOneId;
      const userTwoId = body.userTwoId;
      const commentArr = body.commentArr;

      await this.model.findByIdAndDelete(dialogId);
      await commentService.removeCommentsForTarget(commentArr);
      await authService.setDeleteDialog(userOneId, userTwoId, dialogId);

      return { success: true, message: `Dialog: ${dialogId} deleted` };
    } catch (error) {
      console.log(error);
    }
  }


}

export const dialogService = new DialogService(dialogModel);

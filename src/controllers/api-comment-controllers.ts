import  {Response} from 'express';
import { commentService } from "../service/index.js";
import { handleError } from "../utils/index.js";
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import * as types from '../types/commentsTypes/index.js';


class CommentController  {

  async create(req: IRequestBody<types.CreaterCommentBody>, res: Response<types.IComments>) {
    const body = req.body
    await commentService
      .create(body)
      .then((comments) => res.status(201).json(comments)) 
      .catch((error) =>
        handleError(res, error, "Ну удалось добавить комментарий") 
      );
  }  

  async getAll(req: IRequestQuery<types.GetCommentsBody>, res: Response<types.IComments[]>) { 
    const queryStr = req.query.body
    await commentService.getAll(queryStr)
      .then((comments) => res.status(200).json(comments))
      .catch((error) => handleError(res, error.message, "Ну удалось получить все комментарии"));
      
  }

  async getUserComments(req: IRequestQuery<types.GetUserCommentsQuery>, res: Response<types.IComments[]>) {
    const query = req.query
    await commentService.getUserComments(query)
      .then((comments) => res.status(200).json(comments))
      .catch((error) =>
        handleError(res, error.message, "Ну удалось получить комментарии пользователя") 
      );
  }

  async getOne(req: IRequestParams<{id: string}>, res: Response<types.IComments | null>) {
    const id = req.params.id
    await commentService
      .getOne(id)
      .then((comment) => res.status(200).json(comment))
      .catch((error) =>
        handleError(res, error, "Ну удалось получить комментарий") 
      );
  }

  async remove(req: IRequestQuery<{id: string}>, res: Response<{success: boolean}>) {
    const id = req.query.id
    await commentService
      .remove(id)
      .then(() => res.status(200).json({success: true}))
      .catch((error) =>
        handleError(res, error, "Не удалось удалить комментарий")
      );
  }

  async update(req: IRequestBody<types.UpdateCommentBody>, res: Response<types.IComments>) {
       const id = req.body.updateId
    const updateText = req.body.text
    await commentService
      .update(id, updateText)
      .then((comments) => res.status(200).json(comments))
      .catch((error) =>
        handleError(res, error, "Не удалось обновить комментарий")
      );
  }

  async setAddLike(req: IRequestBody<types.AddLikeCommentBody>, res: Response<{success: boolean}>) {
    //@ts-ignore-start
    const user = req.userId 
    //@ts-ignore-end
    const body = req.body
    await commentService
      .addLike(body, user)
      .then(() => res.status(201).json({success: true}))
      .catch((error) =>
        handleError(res,"Не удалось поставить лайк", error.message)
      );
  }

  async setAddDislaik(req: IRequestBody<types.AddLikeCommentBody>, res: Response<{success: boolean}>) {
    //@ts-ignore-start
    const user = req.userId 
    //@ts-ignore-end
    const body = req.body
    await commentService
      .addDislaik(body, user)
      .then(() => res.status(201).json({success: true}))
      .catch((error) =>
        handleError(res,"Не удалось поставить дизлайк", error.message)
      );
  }

}

export const commentController = new CommentController();  

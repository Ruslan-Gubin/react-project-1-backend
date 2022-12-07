import { Response, Request } from 'express';
import { handleError } from '../utils/index.js';
import { postService } from '../service/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import * as types from '../types/postTypes/index.js';


class PostController {

  async createPost(req: IRequestBody<types.CreateTypeBody>, res: Response<types.IPost>) {
    const body = req.body
    //@ts-ignore start
    const user = req.userId;
    //@ts-ignore end
    await postService 
      .create(body, user)
      .then((post) => res.status(201).json(post))
      .catch((error) => handleError(res, error.message, 'Не удалось создать статью'));
    }
    
    async getAllPosts(req: IRequestQuery<{searchPost: string}>, res: Response<types.IPost[]>) {
      const searchPost = req.query.searchPost
      await postService
      .getAllPost(searchPost)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
    }
    
    async getAllGlobalPosts(req: IRequestQuery<any>, res: Response<types.IPost[]>) {
      const query = req.query 
    await postService
      .getAll(query)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
  }

  async getUserPosts(req: IRequestQuery<types.GetUserPostsQuery>, res: Response<types.IPost[]>) {
    const query = req.query
    await postService
      .getUserPosts(query)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
  }

  async getUserPostsLength(req: IRequestQuery<types.GetUserPostLengthQuery>, res: Response<number>) {
    const query = req.query
    await postService
      .getUserPostsLength(query)
      .then((length) => res.status(200).json(length))
      .catch((error) => handleError(res, error.message, 'Не удалось найти длину данных'));
  }

  async getLenght(req: Request, res: Response<number>) {
    await postService
    .getLength()
    .then((length) => res.status(200).json(length))
    .catch((error) => handleError(res, error.message, `Не удалось найти длину данных ${req}`));
  }
  
  async getOnePost(req: IRequestParams<{id: string}>, res: Response<types.IPost >) {
    const id = req.params.id;
    await postService
    .findOne(id)
      .then((post) => res.status(200).json(post))
      .catch((error) => handleError(res, error.message, 'Статья не найдена'));
    }
    
    async deletePost(req: IRequestParams<{id: string}>, res: Response<{id:string, success: boolean}>) {
      const id = req.params.id;
      await postService
      .remove(id)
      .then(() => res.status(200).json({ id, success: true }))
      .catch((error) => handleError(res, error.message, 'Не удалось удалить статью'));
    }
    
    async updatePost(req: IRequestBody<types.UpdatePostBody>, res: Response<{ success: boolean }>) {
      const body = req.body
      await postService
      .update(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, 'Не удалось обновить статью'));
    }
    
    async setAddComment(req: IRequestBody<types.AddCommentPostBody>, res: Response<{success: boolean}>) {
      const body = req.body
      await postService
      .setAddComment(body)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error.message, 'Не удалось добавить комментарий'));
  }
  
  async setRemoveComment(req: IRequestBody<types.RemoveCommentInPostBody>, res: Response<{success: boolean}>) {
    const body = req.body
    await postService
    .setRemoveComment(body)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, 'Не удалось удалить комментарий'));
  }

  async setUpdateLikes(req: IRequestBody<types.AddlikesBody>, res: Response<{ success: boolean }>) {
    const body = req.body
    //@ts-ignore start
    const userId =  req.userId;
    //@ts-ignore end
    await postService
    .setUpdateLikes(body, userId)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, 'Не удалось добавить лайк'));
  }
  
  async setUpdateDislike(req: IRequestBody<types.AddDislikeBody>, res: Response<{ success: boolean }>) {
    const body = req.body
    //@ts-ignore start
    const userId =  req.userId;
    //@ts-ignore end
    await postService
    .setUpdateDislike(body, userId)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, 'Не удалось добавить лайк'));
  }

  async getTags(req: IRequestQuery<types.GetTagsPostQuery>, res: Response<string[]>) {
    const query = req.query
    await postService
      .getTags(query)
      .then((tags) => res.status(200).json(tags))
      .catch((error) => handleError(res, error.message, 'Не удалось получить тег'));
  }
}

export const postController = new PostController();

import * as express from 'express';
import { handleError } from "../utils/index.js";
import { postService } from "../service/index.js";


class PostController {
  async createPost(req: express.Request, res: express.Response) {
    await postService
      .create(req)
      .then((post) => res.status(201).json(post))
      .catch((error) =>
        handleError(res, error.message, "Не удалось создать статью")
      );
  }

  async getAllPosts(req: express.Request, res: express.Response) {
    await postService
      .getAllPost(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) =>
        handleError(res, error.message, "Не удалось найти статьи")
      );
  }

  async getAllGlobalPosts(req: express.Request, res: express.Response) {
    await postService
      .getAll(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) =>
        handleError(res, error.message, "Не удалось найти статьи")
      );
  }

  async getUserPosts(req: express.Request, res: express.Response) {
    await postService
      .getUserPosts(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) =>
        handleError(res, error.message, "Не удалось найти статьи")
      );
  }

  async getUserPostsLength(req: express.Request, res: express.Response) {
    await postService
      .getUserPostsLength(req)
      .then((length) => res.status(200).json(length))
      .catch((error) =>
        handleError(res, error.message, "Не удалось найти длину данных")
      );
  }

  async getLenght(req: express.Request, res: express.Response) {
    await postService
      .getLength()
      .then((length) => res.status(200).json(length))
      .catch((error) =>
        handleError(res, error.message, `Не удалось найти длину данных ${req}`)
      );
  }

  async getOnePost(req: express.Request, res: express.Response) {
    const id:string = req.params['id'] ? req.params['id'] : ''

    await postService
      .findOne(id)
      .then((post) => res.status(200).json(post))
      .catch((error) => handleError(res, error.message, "Статья не найдена"));
  }

  async deletePost(req: express.Request, res: express.Response) {
    const id:string = req.params['id'] ? req.params['id'] : ''
    await postService
      .remove(req)
      .then(() => res.status(200).json({ id, success: true }))
      .catch((error) =>
        handleError(res, error.message, "Не удалось удалить статью")
      );
  }

  async updatePost(req: express.Request, res: express.Response) {
    await postService
      .update(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => handleError(res, error, "Не удалось обновить статью"));
  }

  async setAddComment(req: express.Request, res: express.Response) {
    await postService
      .setAddComment(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        handleError(res, error.message, "Не удалось добавить комментарий")
      );
  }

  async setRemoveComment(req: express.Request, res: express.Response) {
    await postService
      .setRemoveComment(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        handleError(res, error.message, "Не удалось удалить комментарий")
      );
  }

  async setUpdateLikes(req: express.Request, res: express.Response) {
    await postService
      .setUpdateLikes(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        handleError(res, error.message, "Не удалось добавить лайк")
      );
  }

  async setUpdateDislike(req: express.Request, res: express.Response) {
    await postService
      .setUpdateDislike(req)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) =>
        handleError(res, error.message, "Не удалось добавить лайк")
      );
  }

  async getTags(req: express.Request, res: express.Response) {
    await postService
      .getTags(req)
      .then((tags) => res.status(200).json(tags))
      .catch((error) =>
        handleError(res, error.message, "Не удалось получить тег")
      );
  }
}

export const postController = new PostController();

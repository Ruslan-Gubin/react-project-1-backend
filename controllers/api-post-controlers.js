import { handleError } from "../utils/index.js";
import { postService } from "../service/index.js";

class PostController {
  async createPost(req, res) {
    await postService.create(req)
      .then((post) => res.status(201).json(post))
      .catch((error) => handleError(res, error.message, "Не удалось создать статью"));
  }

  async getAllPosts(req, res) {
    await postService
      .getAll(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error.message, "Не удалось найти статьи"));
  }

  async getUserPosts(req, res) {
    await postService
      .getUserPosts(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error.message, "Не удалось найти статьи"));
  }

  async getUserPostsLength(req, res) {
    await postService
      .getUserPostsLength(req)
      .then((length) => res.status(200).json(length))
      .catch((error) => handleError(res, error.message, "Не удалось найти длину данных"));
  }

  async getLenght(req, res) {
    await postService
      .getLength()
      .then((length) => res.status(200).json(length))
      .catch((error) => handleError(res, error.message, "Не удалось найти длину данных"));
  }

  async getOnePost(req, res) {
    await postService
      .findOne(req.params.id)
      .then((post) => res.status(200).json(post))
      .catch((error) => handleError(res, error.message, "Статья не найдена"));
  }

  async deletePost(req, res) {
    await postService
      .remove(req)
      .then(() => res.status(200).json({id:req.params.id, success: true}))
      .catch((error) => handleError(res, error.message, "Не удалось удалить статью"));
  }

  async updatePost(req, res) {
    await postService
    .update(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error, "Не удалось обновить статью"));
  }

  async setAddComment(req, res) {
    await postService
    .setAddComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось добавить комментарий"));
  }

  async setRemoveComment(req, res) {
    await postService
    .setRemoveComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось удалить комментарий"));
  }

  async setUpdateLikes(req, res) {
    await postService
    .setUpdateLikes(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось добавить лайк"));
  }

  async setUpdateDislike(req, res) {
    await postService
    .setUpdateDislike(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось добавить лайк"));
  }

  async getTags(req, res) {
    await postService.getTags(req)
    .then((tags) => res.status(200).json(tags))
    .catch((error) => handleError(res, error.message, "Не удалось получить тег"));
  }

}

export const postController = new PostController();

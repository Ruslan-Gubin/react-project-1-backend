import { handleError } from "../utils/index.js";
import { postService } from "../service/index.js";

class PostController {
  async createPost(req, res) {
    await postService.create(req)
      .then((post) => res.status(201).json(post))
      .catch((error) => handleError(res, error, "Не удалось создать статью"));
  }

  async getAllPosts(req, res) {
    await postService
      .getAll(req)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => handleError(res, error, "Не удалось найти статьи"));
  }

  async getLenght(req, res) {
    await postService
      .getLength()
      .then((length) => res.status(200).json(length))
      .catch((error) => handleError(res, error, "Не удалось найти длину данных"));
  }

  async getOnePost(req, res) {
    await postService
      .findOne(req.params.id)
      .then((post) => res.status(200).json(post))
      .catch((error) => handleError(res, error, "Статья не найдена"));
  }

  async deletePost(req, res) {
    await postService
      .remove(req.params.id)
      .then(() => res.status(200).json(req.params.id))
      .catch((error) => handleError(res, error, "Не удалось удалить статью"));
  }

  async updatePost(req, res) {
    await postService
    .update(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error, "Не удалось обновить статью"));
  }

  async getTags(req, res) {
    await postService.getTags(req)
    .then((tags) => res.status(200).json(tags))
    .catch((error) => handleError(res, error, "Не удалось получить тег"));
  }

}

export const postController = new PostController();

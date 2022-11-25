import { handleError } from "../utils/index.js";
import { dialogService } from "../service/index.js";

class DialogController {
  async createDialog(req, res) {
    await dialogService.createDialog(req)
    .then((dialog) => res.status(201).json(dialog))
    .catch((error) => handleError(res, error.message, "Не удалось создать диалог"));
  }
  
  async getOneDialog(req, res) {
    await dialogService
    .getOneDialog(req)
    .then((dialog) => res.status(200).json(dialog))
    .catch((error) => handleError(res, error.message, "Диалог не найден"));
  }
  
  async setAddComment(req, res) {
    await dialogService
    .setAddComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось добавить комментарий"));
  }
  
  async setRemoveComment(req, res) {
    await dialogService
    .setRemoveComment(req)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handleError(res, error.message, "Не удалось удалить комментарий"));
  }

  async setDeleteDialog(req, res) {
    await dialogService
      .setDeleteDialog(req)
      .then((message) => res.status(200).json(message))
      .catch((error) => handleError(res, error.message, "Не удалось удалить диалог"));
  }

  // async getAllPosts(req, res) {
  //   await postService
  //     .getAll(req)
  //     .then((posts) => res.status(200).json(posts))
  //     .catch((error) => handleError(res, error.message, "Не удалось найти статьи"));
  // }

  // async getUserPosts(req, res) {
  //   await postService
  //     .getUserPosts(req)
  //     .then((posts) => res.status(200).json(posts))
  //     .catch((error) => handleError(res, error.message, "Не удалось найти статьи"));
  // }

  // async getUserPostsLength(req, res) {
  //   await postService
  //     .getUserPostsLength(req)
  //     .then((length) => res.status(200).json(length))
  //     .catch((error) => handleError(res, error.message, "Не удалось найти длину данных"));
  // }

  // async getLenght(req, res) {
  //   await postService
  //     .getLength()
  //     .then((length) => res.status(200).json(length))
  //     .catch((error) => handleError(res, error.message, "Не удалось найти длину данных"));
  // }



  // async updatePost(req, res) {
  //   await postService
  //   .update(req)
  //   .then(() => res.status(200).json({ success: true }))
  //   .catch((error) => handleError(res, error, "Не удалось обновить статью"));
  // }



  // async setUpdateLikes(req, res) {
  //   await postService
  //   .setUpdateLikes(req)
  //   .then(() => res.status(200).json({ success: true }))
  //   .catch((error) => handleError(res, error.message, "Не удалось добавить лайк"));
  // }

  // async setUpdateDislike(req, res) {
  //   await postService
  //   .setUpdateDislike(req)
  //   .then(() => res.status(200).json({ success: true }))
  //   .catch((error) => handleError(res, error.message, "Не удалось добавить лайк"));
  // }

  // async getTags(req, res) {
  //   await postService.getTags(req)
  //   .then((tags) => res.status(200).json(tags))
  //   .catch((error) => handleError(res, error.message, "Не удалось получить тег"));
  // }

}

export const dialogController = new DialogController();
import { handleError } from '../utils/index.js';
import { postService } from '../service/index.js';
class PostController {
    async createPost(req, res) {
        const body = req.body;
        const user = req.userId;
        await postService
            .create(body, user)
            .then((post) => res.status(201).json(post))
            .catch((error) => handleError(res, error.message, 'Не удалось создать статью'));
    }
    async getAllPosts(req, res) {
        const searchPost = req.query.searchPost;
        await postService
            .getAllPost(searchPost)
            .then((posts) => res.status(200).json(posts))
            .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
    }
    async getAllGlobalPosts(req, res) {
        const query = req.query;
        await postService
            .getAll(query)
            .then((posts) => res.status(200).json(posts))
            .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
    }
    async getUserPosts(req, res) {
        const query = req.query;
        await postService
            .getUserPosts(query)
            .then((posts) => res.status(200).json(posts))
            .catch((error) => handleError(res, error.message, 'Не удалось найти статьи'));
    }
    async getUserPostsLength(req, res) {
        const query = req.query;
        await postService
            .getUserPostsLength(query)
            .then((length) => res.status(200).json(length))
            .catch((error) => handleError(res, error.message, 'Не удалось найти длину данных'));
    }
    async getLenght(req, res) {
        await postService
            .getLength()
            .then((length) => res.status(200).json(length))
            .catch((error) => handleError(res, error.message, `Не удалось найти длину данных ${req}`));
    }
    async getOnePost(req, res) {
        const id = req.params.id;
        await postService
            .findOne(id)
            .then((post) => res.status(200).json(post))
            .catch((error) => handleError(res, error.message, 'Статья не найдена'));
    }
    async deletePost(req, res) {
        const id = req.params.id;
        await postService
            .remove(id)
            .then(() => res.status(200).json({ id, success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить статью'));
    }
    async updatePost(req, res) {
        const body = req.body;
        await postService
            .update(body)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error, 'Не удалось обновить статью'));
    }
    async setAddComment(req, res) {
        const body = req.body;
        await postService
            .setAddComment(body)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось добавить комментарий'));
    }
    async setRemoveComment(req, res) {
        const body = req.body;
        await postService
            .setRemoveComment(body)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить комментарий'));
    }
    async setUpdateLikes(req, res) {
        const body = req.body;
        const userId = req.userId;
        await postService
            .setUpdateLikes(body, userId)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось добавить лайк'));
    }
    async setUpdateDislike(req, res) {
        const body = req.body;
        const userId = req.userId;
        await postService
            .setUpdateDislike(body, userId)
            .then(() => res.status(200).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось добавить лайк'));
    }
    async getTags(req, res) {
        const query = req.query;
        await postService
            .getTags(query)
            .then((tags) => res.status(200).json(tags))
            .catch((error) => handleError(res, error.message, 'Не удалось получить тег'));
    }
}
export const postController = new PostController();

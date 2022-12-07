import { postModel } from '../models/index.js';
import { cloudinary } from '../utils/cloudinary.js';
import { commentService } from './commentService.js';
class PostService {
    constructor(model) {
        this.model = model;
    }
    async getAllPost(searchPost) {
        if (!searchPost) {
            return [];
        }
        return await this.model
            .find({ title: { $regex: `${searchPost}`, $options: 'i' } })
            .sort({ createdAt: -1 })
            .populate('user')
            .exec();
    }
    async create(body, user) {
        const image = body.image;
        const result = await cloudinary.uploader.upload(image, {
            folder: 'Posts',
        });
        const newPost = await new this.model({
            ...body,
            user,
            image: { public_id: result.public_id, url: result.secure_url },
        }).save();
        return newPost;
    }
    async getAll(query) {
        const category = query.categor ? query.categor : false;
        const search = query.search ? query.search : '';
        const tag = query.tags ? query.tags : '';
        const page = query.page ? query.page : 0;
        const perPage = query.perpage ? query.perpage : 0;
        const skips = (page - 1) * perPage;
        const result = await this.model
            .find({
            $and: [{ tags: { $regex: tag } }, { title: { $regex: `${search}`, $options: 'i' } }],
        })
            .skip(skips)
            .limit(perPage)
            .sort(category == 'popular' ? { viewsCount: -1 } : { createdAt: -1 })
            .populate('user');
        return result;
    }
    async getUserPosts(query) {
        const category = query.categor ? query.categor : false;
        const authId = query.auth;
        const search = query.search ? query.search : '';
        const tag = query.tags ? query.tags : '';
        const page = query.page ? query.page : 1;
        const perPage = query.perpage ? query.perpage : 10;
        const skips = (page - 1) * perPage;
        const result = await this.model
            .find({
            $and: [{ tags: { $regex: tag } }, { user: { _id: authId } }, { title: { $regex: `${search}`, $options: 'i' } }],
        })
            .skip(skips)
            .limit(perPage)
            .sort(category == 'popular' ? { viewsCount: -1 } : { createdAt: -1 })
            .populate('user');
        return result;
    }
    async getUserPostsLength(query) {
        const search = query.search ? query.search : '';
        const tag = query.tags ? query.tags : '';
        if (!query.auth) {
            throw new Error('Не указан id пользователя');
        }
        const targetUserId = query.auth;
        const userPosts = await this.model.find({
            $and: [
                { tags: { $regex: tag } },
                { user: { _id: targetUserId } },
                { title: { $regex: `${search}`, $options: 'i' } },
            ],
        });
        if (userPosts.length <= 0) {
            return 1;
        }
        else {
            return userPosts.length;
        }
    }
    async getLength() {
        return await this.model.countDocuments();
    }
    async findOne(id) {
        if (!id) {
            throw new Error('Не найден ID');
        }
        const post = await this.model
            .findOneAndUpdate({ _id: id }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })
            .populate('user');
        if (!post) {
            throw new Error('Пост не найден');
        }
        return post;
    }
    async remove(id) {
        try {
            const postComments = await this.model.find({ _id: id }, { _id: false, comments: true });
            const commentsArr = postComments[0].comments;
            commentService.removeCommentsForTarget(commentsArr);
            const post = await this.model.findByIdAndDelete(id);
            if (post) {
                const imgId = post.image.public_id;
                await cloudinary.uploader.destroy(imgId);
            }
            return { success: true, message: 'Post deleted' };
        }
        catch (error) {
            console.log(error);
        }
    }
    async update(body) {
        const postId = body.id;
        const prevPost = await this.model.findById(postId);
        const prevImage = prevPost === null || prevPost === void 0 ? void 0 : prevPost.image;
        if ((prevImage === null || prevImage === void 0 ? void 0 : prevImage.url) === body.image) {
            return await this.model.updateOne({ _id: postId }, { ...body, image: prevImage });
        }
        else {
            const imgId = await (prevPost === null || prevPost === void 0 ? void 0 : prevPost.image.public_id);
            if (imgId) {
                await cloudinary.uploader.destroy(imgId);
            }
            const newImage = body.image;
            const result = await cloudinary.uploader.upload(newImage, {
                folder: 'Posts',
                fetch_format: 'auto',
            });
            return await this.model.updateOne({ _id: postId }, {
                ...body,
                image: { public_id: result.public_id, url: result.secure_url },
            });
        }
    }
    async setAddComment(body) {
        if (!body) {
            throw new Error('Не указан ID поста или коментария');
        }
        const postId = body.targetId;
        const commentId = body.commentId;
        const newPost = await this.model.updateOne({ _id: postId }, { $push: { comments: commentId } }, { returnDocument: 'after' });
        return newPost;
    }
    async setRemoveComment(body) {
        if (!body) {
            throw new Error('Не указан ID поста или коментария');
        }
        const postId = body.targetId;
        const newArrComments = body.newArrComments;
        return await this.model.updateOne({ _id: postId }, { comments: newArrComments }, { returnDocument: 'after' });
    }
    async setUpdateLikes(body, userId) {
        if (!body.id) {
            throw new Error('ID поста не найден');
        }
        const id = body.id;
        const likesArr = body.likes;
        if (likesArr.includes(userId)) {
            const post = await this.model.findOneAndUpdate({ _id: id }, { likes: likesArr.filter((users) => users !== userId) }, { returnDocument: 'after' });
            if (post) {
                return post;
            }
        }
        else {
            const post = await this.model.findOneAndUpdate({ _id: id }, { likes: [...likesArr, userId] }, { returnDocument: 'after' });
            if (post) {
                return post;
            }
        }
    }
    async setUpdateDislike(body, userId) {
        if (!body.id) {
            throw new Error('ID поста не найден');
        }
        const id = body.id;
        const likesArr = body.dislikes;
        if (likesArr.includes(userId)) {
            const post = await this.model.findOneAndUpdate({ _id: id }, { dislikes: likesArr.filter((users) => users !== userId) }, { returnDocument: 'after' });
            return post;
        }
        else {
            const post = await this.model.findOneAndUpdate({ _id: id }, { dislikes: [...likesArr, userId] }, { returnDocument: 'after' });
            return post;
        }
    }
    async getTags(query) {
        const userId = query.userId;
        const limit = query.limit;
        const filterTags = [];
        const arrayTags = await this.model
            .find({ user: { _id: userId } }, { tags: true, _id: false })
            .sort({ createdAt: -1 });
        const tags = arrayTags.map((obj) => obj.tags.join('').trim().split(' '));
        tags.forEach((item) => filterTags.push(...item));
        const result = [];
        filterTags.forEach((item) => {
            const copy = result;
            if (!copy.includes(item)) {
                result.push(item);
            }
        });
        if (limit) {
            return result.splice(0, limit);
        }
        else {
            return result;
        }
    }
}
export const postService = new PostService(postModel);

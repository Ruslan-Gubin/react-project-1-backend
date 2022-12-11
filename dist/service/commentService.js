import { commentModel } from "../models/index.js";
class CommentService {
    constructor(model) {
        this.model = model;
    }
    async create(body) {
        const { text, user, target } = body;
        const newComment = await new this.model({ text, user, target }).save();
        return newComment;
    }
    async getAll(queryStr) {
        const arrComments = queryStr.split(',');
        if (!arrComments) {
            throw new Error('Данные по запросу комментариев не найдены');
        }
        else {
            return await this.model.find({ _id: arrComments }).sort({ createdAt: -1 }).populate("user").exec();
        }
    }
    async getUserComments(query) {
        const userId = query.userId;
        const limit = query.limit;
        if (!userId) {
            throw new Error('Не указан ID пользователя');
        }
        return await this.model.find({ user: { _id: userId } }).limit(limit).sort({ createdAt: -1 }).populate("user").exec();
    }
    async getOne(id) {
        const comment = await this.model.findById(id).populate("user");
        return comment;
    }
    async remove(id) {
        if (!id) {
            throw new Error("не указан ID");
        }
        const comment = await this.model.findByIdAndDelete(id);
        return comment;
    }
    async removeCommentsForTarget(arr) {
        if (!arr) {
            throw new Error('Комментарии не найдены');
        }
        return await this.model.deleteMany({ _id: arr });
    }
    async update(id, updateText) {
        if (!id) {
            throw new Error("не указан ID");
        }
        return await this.model.updateOne({ _id: id }, {
            text: updateText,
        });
    }
    async addLike(body, user) {
        const id = body._id;
        const likesArr = body.likes;
        if (!id) {
            throw new Error('Не найден ID комментария');
        }
        if (likesArr && likesArr.includes(user)) {
            const comment = await this.model.findOneAndUpdate({ _id: id }, { likes: this.filterArrUsers(likesArr, user) }, { returnDocument: "after" });
            return comment;
        }
        else if (likesArr && !likesArr.includes(user)) {
            const comment = await this.model.findOneAndUpdate({ _id: id }, { likes: [...likesArr, user] }, { returnDocument: "after" });
            return comment;
        }
    }
    async addDislaik(body, user) {
        const id = body._id;
        const disLikesArr = body.dislikes;
        if (!id) {
            throw new Error('Не найден ID комментария');
        }
        if (disLikesArr && disLikesArr.includes(user)) {
            const comment = await this.model.findOneAndUpdate({ _id: id }, { dislikes: this.filterArrUsers(disLikesArr, user) }, { returnDocument: "after" });
            return comment;
        }
        else if (disLikesArr && !disLikesArr.includes(user)) {
            const comment = await this.model.findOneAndUpdate({ _id: id }, { dislikes: [...disLikesArr, user] }, { returnDocument: "after" });
            return comment;
        }
    }
    async createCommentForTarget(body, model) {
        if (!body) {
            throw new Error('Не получено тело запроса');
        }
        const productId = body.targetId;
        const commentId = body.commentId;
        const update = await model.updateOne({ _id: productId }, { $push: { comments: commentId } }, { returnDocument: 'after' });
        return update;
    }
    filterArrUsers(disLikesArr, user) {
        return disLikesArr.filter(users => users !== user);
    }
}
export const commentService = new CommentService(commentModel);

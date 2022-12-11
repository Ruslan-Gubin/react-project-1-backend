class CommentService {
    constructor() { }
    async create(body, model) {
        if (!body) {
            throw new Error('Не получено тело запроса');
        }
        const productId = body.targetId;
        const commentId = body.commentId;
        const update = await this.model.updateOne({ _id: productId }, { $push: { comments: commentId } }, { returnDocument: 'after' });
        return update;
    }
}
export const commentServices = new CommentService();

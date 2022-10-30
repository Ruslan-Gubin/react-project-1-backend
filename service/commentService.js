import { commentModel } from "../models/index.js";

class CommentService {
  constructor(options) {
    this.model = options.model
  }
  async create(req) {
    const { text, likes } = req.body;
    const user = req.userId;
    const newComment = await new this.model({ text, likes, user }).save();
    return newComment;
  }

  async getAll(limit) {
    const comment = await this.model
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("user")
      .exec();
    return comment;
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

  async update(req) {
    if (!req.params.id) {
      throw new Error("не указан ID");
    }

    const postId = req.params.id;

    return await this.model.updateOne(
      { _id: postId },
      {
        text: req.body.text,
        user: req.userId,
      }
    );
  }
}

export const commentService = new CommentService({
    model: commentModel
});

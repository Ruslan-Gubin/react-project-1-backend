import { commentModel } from "../models/comments.js";

class CommentService {

  async create(req) {
    const { text, likes } = req.body;
    const user = req.userId;
    const newComment = await new commentModel({ text, likes, user }).save();
    return newComment;
  }

  async getAll() {
    const comment = await commentModel.find().sort({ createdAt: -1 })
    .limit()
    .populate("user")
    .exec()
    return comment;
  }

  async getOne(id) {
    const comment = await commentModel.findById(id).populate('user');
    return comment;
  }

  async remove(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const comment = await commentModel.findByIdAndDelete(id);
    return comment;
  }

  async update(req) {
    if (!req.body._id) {
      throw new Error("не указан ID");
    }

    const postId = req.params.id;
    
    const updatedComment =  await commentModel.updateOne(
      { _id: postId },
      {
        text: req.body.text,
        user: req.userId,
      }
    );
    return updatedComment;
  }
  
}

export const commentService = new CommentService()

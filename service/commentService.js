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
    const id = req.query.id
    const updateText = req.body.text
    if (!id) {
      throw new Error("не указан ID");
    }
    return await this.model.updateOne(
      { _id: id },
      {
        text: updateText,
        user: req.userId,
      }
    );
  }

  async addLike(req) {
    const id = await req.body._id
    const likesArr = await req.body.likes
    const user = await req.userId;
    
    if (!id) {
      throw new Error('Не найден ID комментария')
    } 
    
    if (likesArr.includes(user)) {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { likes: likesArr.filter(users => users !== user) },
        { returnDocument: "after" }
        )
        return comment
    } else {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { likes: [...likesArr,  user] },
        { returnDocument: "after" }
        )
        
        return comment
      }
      }

  async addDislaik(req) {
    const id = await req.body._id
    const disLikesArr = await req.body.dislikes
    const user = await req.userId;

    if (!id) {
      throw new Error('Не найден ID комментария')
    } 
    
    if (disLikesArr.includes(user)) {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { dislikes: disLikesArr.filter(users => users !== user) },
        { returnDocument: "after" }
        )
        return comment
    } else {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { dislikes: [...disLikesArr,  user] },
        { returnDocument: "after" }
        )
        return comment
      }
      }

}

export const commentService = new CommentService({
    model: commentModel
});

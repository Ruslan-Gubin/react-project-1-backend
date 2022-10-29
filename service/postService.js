import { postModel } from "../models/index.js";

class PostService {
  async create(req) {
    const user = req.userId;
    const newPost = await new postModel({ ...req.body, user }).save();
    return newPost;
  }

  async getAll() {
    const post = await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();
    return post;
  }

  async findOne(id) {
    if (!id) {
      throw new Error("Не найден ID");
    }

    const post = await postModel
      .findOneAndUpdate(
        { _id: id },
        { $inc: { viewsCount: 1 } },
        { returnDocument: "after" }
      )
      .populate("user");
    return post;
  }

  async remove(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const post = await postModel.findByIdAndDelete(id);
    return post;
  }

  async update(req) {
    const postId = req.params.id;
    const post = await postModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      }
    );
    return post;
  }

  async getTags(req) {
    const limit = req.query.limit
    const result = [];
    const filterTags = [];

    const posts = await postModel.find().sort({ createdAt: -1 }).exec();

    const tags = posts.map((obj) => obj.tags.join("").trim().split(" "));

    tags.map((item) => (item ? filterTags.push(...item) : false));

    const setTags = new Set(filterTags);

    for (const key of setTags) {
      if (key) {  
        result.push(key);
      }
    }  
    if (limit) {
      return result.splice(0, limit)
    } else {
      return result;
    }
  }
  
}

export const postService = new PostService();

import { postModel } from "../models/index.js";

class PostService {
  constructor(options) {
    this.model = options.model;
  }

  async getAllPost() {
    return await this.model
      .find()
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();
  }

  async create(req) {
    const user = req.userId;
    const newPost = await new this.model({ ...req.body, user }).save();
    return newPost;
  }

  async getAll(req) {
    const category = await req.query.category ? req.query.category : false;
    const search = await req.query.search ? req.query.search.toLowerCase() : "";
    const tag = await req.query.tags ? req.query.tags : false;
    const page = await req.query.page ? req.query.page : null;
    const perPage = await req.query.perpage ? req.query.perpage : null;
    const skips = (page -1)  * perPage

    const result = await this.model
      .find(tag ?  {tags:  {$regex: tag}} : null || search ? {title: {$regex: search}} : null )
      .skip(skips)
      .limit(perPage)
      .sort(category == 'popular'  ? { viewsCount: -1 } : { createdAt: -1 })

      return result
  }

  async getLength() {
    return await this.model.countDocuments()
  }

  async searchTags(req) {
    const tag = req.query.tags;
    const tags = await this.model.find({ tags: tag });
    return tags;
  }

  async findOne(id) {
    if (!id) {
      throw new Error("Не найден ID");
    }

    const post = await this.model
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
    const post = await this.model.findByIdAndDelete(id);
    return post;
  }

  async update(req) {
    const postId = req.params.id;
    const post = await this.model.updateOne({ _id: postId }, { ...req.body });
    return post;
  }

  async getTags(req) {
    const limit = req.query.limit;
    const result = [];
    const filterTags = [];

    const arrayTags = await this.model
      .find({}, { tags: true, _id: false })
      .sort({ createdAt: -1 });

    const tags = arrayTags.map((obj) => obj.tags.join("").trim().split(" "));

    tags.map((item) => (item ? filterTags.push(...item) : false));

    const setTags = new Set(filterTags);

    for (const key of setTags) {
      if (key) {
        result.push(key);
      }
    }
    
    if (limit) {
      return result.splice(0, limit);
    } else {
      return result;
    }
  }
}

export const postService = new PostService({ model: postModel });

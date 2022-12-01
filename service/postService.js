import { postModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";
import { commentService } from "./commentService.js";

class PostService {
  constructor(options) {
    this.model = options.model;
  }

  async getAllPost(req) {
    const searchPost = req.query.searchPost;
    if (!searchPost) {
      return [];
    }

    return await this.model
      .find({ title: { $regex: `${searchPost}`, $options: "i" } })
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();
  }

  async create(req) {
    const image = req.body.image;
    const user = req.userId;

    const result = await cloudinary.uploader.upload(image, {
      folder: "Posts",
    });

    const newPost = await this.model({
      ...req.body,
      user,
      image: { public_id: result.public_id, url: result.secure_url },
    }).save();

    return newPost;
  }

  async getAll(req) {
    const category = req.query.categor ? req.query.categor : false;
    const search = req.query.search ? req.query.search : "";
    const tag = req.query.tags ? req.query.tags : "";
    const page = (await req.query.page) ? req.query.page : null;
    const perPage = (await req.query.perpage) ? req.query.perpage : null;
    const skips = (page - 1) * perPage;

    const result = await this.model
      .find({
        $and: [
          { tags: { $regex: tag } },
          { title: { $regex: `${search}`, $options: "i" } },
        ],
      })
      .skip(skips)
      .limit(perPage)
      .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
      .populate("user");

    return result;
  }

  async getUserPosts(req) {
    const category = req.query.categor ? req.query.categor : false;
    const authId = req.query.auth;
    const search = req.query.search ? req.query.search : "";
    const tag = req.query.tags ? req.query.tags : "";
    const page = (await req.query.page) ? req.query.page : null;
    const perPage = (await req.query.perpage) ? req.query.perpage : null;
    const skips = (page - 1) * perPage;

    const result = await this.model
      .find({
        $and: [
          { tags: { $regex: tag } },
          { user: { _id: authId } },
          { title: { $regex: `${search}`, $options: "i" } },
        ],
      })
      .skip(skips)
      .limit(perPage)
      .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
      .populate("user");

    return result;
  }

  async getUserPostsLength(req) {
    const search = req.query.search ? req.query.search : "";
    const tag = req.query.tags ? req.query.tags : "";
    if (!req.query.auth) {
      throw new Error("Не указан id пользователя");
    }
    const targetUserId = req.query.auth;
    const userPosts = await this.model.find({
      $and: [
        { tags: { $regex: tag } },
        { user: { _id: targetUserId } },
        { title: { $regex: `${search}`, $options: "i" } },
      ],
    });

    if (userPosts.length <= 0) {
      return 1;
    } else {
      return userPosts.length;
    }
  }

  async getLength() {
    return await this.model.countDocuments();
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

  async remove(req) {
    try {
      const postComments = await this.model.find(
        { _id: req.params.id },
        { _id: false, comments: true }
      );
      const commentsArr = postComments[0].comments;

      commentService.removeCommentsForTarget(commentsArr);

      const post = await this.model.findByIdAndDelete(req.params.id);
      const imgId = post.image.public_id; ///Posts/ixe9reywr3vtapa0fp1d  public_id
      await cloudinary.uploader.destroy(imgId); // delete image cloudinary

      return { success: true, message: "Post deleted" };
    } catch (error) {
      console.log(error);
    }
  }

  async update(req) {
    const postId = req.body.id;
    const prevPost = await this.model.findById(postId);
    const prevImage = await prevPost.image;

    if (prevImage.url === req.body.image) {
      return await this.model.updateOne(
        { _id: postId },
        { ...req.body, image: prevImage }
      );
    } else {
      const imgId = await prevPost.image.public_id;
      await cloudinary.uploader.destroy(imgId);

      const newImage = await req.body.image;
      const result = await cloudinary.uploader.upload(newImage, {
        folder: "Posts",
        fetch_format: "auto",
      });

      return await this.model.updateOne(
        { _id: postId },
        {
          ...req.body,
          image: { public_id: result.public_id, url: result.secure_url },
        }
      );
    }
  }

  async setAddComment(req) {
    const postId = req.body.targetId;
    const commentId = req.body.commentId;
    if (!postId && !commentId) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: postId },
      { $push: { comments: commentId } }
    );
  }

  async setRemoveComment(req) {
    const postId = req.body.targetId;
    const newArrComments = req.body.newArrComments;
    if (!postId && !commentId) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: postId },
      { comments: newArrComments }
    );
  }

  async setUpdateLikes(req) {
    const id = req.body._id;
    const likesArr = await req.body.likes;
    const user = await req.userId;

    if (!id) {
      throw new Error("ID поста не найден");
    }

    if (likesArr.includes(user)) {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { likes: likesArr.filter((users) => users !== user) },
        { returnDocument: "after" }
      );
      return post;
    } else {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { likes: [...likesArr, user] },
        { returnDocument: "after" }
      );
      return post;
    }
  }

  async setUpdateDislike(req) {
    const id = req.body._id;
    const likesArr = await req.body.dislikes;
    const user = await req.userId;

    if (!id) {
      throw new Error("ID поста не найден");
    }

    if (likesArr.includes(user)) {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { dislikes: likesArr.filter((users) => users !== user) },
        { returnDocument: "after" }
      );
      return post;
    } else {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { dislikes: [...likesArr, user] },
        { returnDocument: "after" }
      );
      return post;
    }
  }

  async getTags(req) {
    const userId = req.query.userId;
    const limit = req.query.limit;
    const result = [];
    const filterTags = [];

    const arrayTags = await this.model
      .find({ user: { _id: userId } }, { tags: true, _id: false })
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

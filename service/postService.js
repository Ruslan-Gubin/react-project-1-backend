import { postModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";
import { commentService } from "./commentService.js";

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
    const category = (await req.query.category) ? req.query.category : false;
    const search = (await req.query.search)
      ? req.query.search.toLowerCase()
      : "";
    const tag = (await req.query.tags) ? req.query.tags : false;
    const page = (await req.query.page) ? req.query.page : null;
    const perPage = (await req.query.perpage) ? req.query.perpage : null;
    const skips = (page - 1) * perPage;

    const result = await this.model
      .find(
        tag
          ? { tags: { $regex: tag } }
          : null || search
          ? { title: { $regex: search } }
          : null
      )
      .skip(skips)
      .limit(perPage)
      .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
      .populate('user')

    return result;
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
      const postComments = await this.model.find({_id: req.params.id},{_id: false,comments: true})
      const commentsArr = postComments[0].comments

      commentService.removeCommentsForTarget(commentsArr)

      const post = await this.model.findByIdAndDelete(req.params.id);
      const imgId = post.image.public_id;   ///Posts/ixe9reywr3vtapa0fp1d  public_id
      await cloudinary.uploader.destroy(imgId);  // delete image cloudinary 

      return ({success: true, message: 'Post deleted'});
    } catch (error) {
      console.log(error)
    }
  }

  async update(req) { 
    const postId = req.body.id;
    const prevPost = await this.model.findById(postId)
    const prevImage = await prevPost.image
    
    if (prevImage.url === req.body.image) { 
      return await this.model.updateOne({ _id: postId }, { ...req.body, image: prevImage});
    } else  {
      const imgId = await prevPost.image.public_id;  
      await cloudinary.uploader.destroy(imgId) 

      const newImage = await req.body.image;
      const result = await cloudinary.uploader.upload(newImage, {  
        folder: "Posts",
        fetch_format: "auto",
      });

      return await this.model.updateOne({ _id: postId }, { ...req.body, image: { public_id: result.public_id, url: result.secure_url },  });
    }

  }

  async setAddComment(req) { 
    const postId = req.body.postId
    const commentId = req.body.commentId
    if (!postId && !commentId) {
      throw new Error('Не указан ID поста или коментария')
    }
    
    return await this.model.updateOne(
      {_id: postId},
      {$push: {comments: commentId}})
  }

  async setRemoveComment(req) {    
    const postId = req.body.postId
    const newArrComments = req.body.newArrComments
    if (!postId && !commentId) {
      throw new Error('Не указан ID поста или коментария')
    }
    
    return await this.model.updateOne(
      {_id: postId},
      {comments: newArrComments})
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

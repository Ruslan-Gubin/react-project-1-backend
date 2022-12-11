import { Model, UpdateWriteOpResult } from 'mongoose';
import { postModel } from '../models/index.js';
import { AddCommentPostBody } from '../types/postTypes/AddCommentPost.js';
import * as types from '../types/postTypes/index.js';
import { cloudinary } from '../utils/cloudinary.js';
import { commentService } from './commentService.js';

class PostService {
  constructor(private readonly model: Model<types.IPost>) {}

  async getAllPost(searchPost: string): Promise<types.IPost[]> {
    if (!searchPost) {
      return [];
    }

    return await this.model
      .find({ title: { $regex: `${searchPost}`, $options: 'i' } })
      .sort({ createdAt: -1 })
      .populate('user')
      .exec();
  }

  async create(body: types.CreateTypeBody, user: any): Promise<types.IPost> {
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

  async getAll(query: types.GetPostsQuery): Promise<types.IPost[]> {
    const category = query.categor ? query.categor : false;
    const search = query.search ? query.search : '';
    const tag = query.tags ? query.tags : '';
    const page: number = query.page ? query.page : 0;
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

  async getUserPosts(query: types.GetUserPostsQuery): Promise<types.IPost[]> {
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

  async getUserPostsLength(query: types.GetUserPostLengthQuery): Promise<number> {
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
    } else {
      return userPosts.length;
    }
  }

  async getLength(): Promise<number> {
    return await this.model.countDocuments();
  }

  async findOne(id: string): Promise<types.IPost> {
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

  async remove(id: string): Promise<any> {
    try {
      const postComments = await this.model.find({ _id: id }, { _id: false, comments: true });
      const commentsArr = postComments[0].comments;
      
      commentService.removeCommentsForTarget(commentsArr);
      
      const post = await this.model.findByIdAndDelete(id);
      if (post) {
        const imgId = post.image.public_id; ///Posts/ixe9reywr3vtapa0fp1d  public_id
        await cloudinary.uploader.destroy(imgId); // delete image cloudinary
      }
      
      return { success: true, message: 'Post deleted' };
    } catch (error) {
      console.log(error);
    }
  }
  
  async update(body: types.UpdatePostBody): Promise<UpdateWriteOpResult> {
    const postId = body.id;
    const prevPost = await this.model.findById(postId);
    const prevImage = prevPost?.image;
    
    if (prevImage?.url === body.image) {
      return await this.model.updateOne({ _id: postId }, { ...body, image: prevImage });
    } else {
      const imgId = await prevPost?.image.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
      
      const newImage = body.image;
      const result = await cloudinary.uploader.upload(newImage, {
        folder: 'Posts',
        fetch_format: 'auto',
      });

      return await this.model.updateOne(
        { _id: postId },
        {
          ...body,
          image: { public_id: result.public_id, url: result.secure_url },
        },
      );
    }
  }
  
  async setAddComment(body: AddCommentPostBody): Promise<UpdateWriteOpResult> {
    const newPost = commentService.createCommentForTarget(body, this.model)
    return newPost;
  }

  async setRemoveComment(body: types.RemoveCommentInPostBody): Promise<any> {
    if (!body) {
      throw new Error('Не указан ID поста или коментария');
    }
    const postId = body.targetId;
    const newArrComments = body.newArrComments;
    const update = await this.model.updateOne({ _id: postId }, { comments: newArrComments }, { returnDocument: 'after' });
    return update
  }

  async setUpdateLikes(body: types.AddlikesBody, userId: string): Promise<any> {
    if (!body.id) {
      throw new Error('ID поста не найден');
    }
    const id = body.id;
    const likesArr = body.likes;

    if (likesArr.includes(userId)) {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { likes: likesArr.filter((users) => users !== userId) },
        { returnDocument: 'after' },
      );
      if (post) {
        return post;
      }
    } else {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { likes: [...likesArr, userId] },
        { returnDocument: 'after' },
      );
      if (post) {
        return post;
      }
    }
  }

  async setUpdateDislike(body: types.AddDislikeBody, userId: string): Promise<any> {
    if (!body.id) {
      throw new Error('ID поста не найден');
    }
    const id = body.id;
    const likesArr = body.dislikes;

    if (likesArr.includes(userId)) {
      const post = await this.model.findOneAndUpdate(
        { _id: id },
        { dislikes: likesArr.filter((users) => users !== userId) },
        { returnDocument: 'after' },
        );
        return post;
      } else {
        const post = await this.model.findOneAndUpdate(
          { _id: id },
        { dislikes: [...likesArr, userId] },
        { returnDocument: 'after' },
      );
      return post;
    }
  }
  
  async getTags(query: types.GetTagsPostQuery): Promise<string[]> {
    const userId = query.userId;
    const limit = query.limit;
    const filterTags: string[] = [];
    
    const arrayTags = await this.model
    .find({ user: { _id: userId } }, { tags: true, _id: false })
    .sort({ createdAt: -1 });
    
    const tags = arrayTags.map((obj) => obj.tags.join('').trim().split(' '));
    
    tags.forEach((item) => filterTags.push(...item));
    const result: string[] = [];
    filterTags.forEach((item) => {
      const copy = result;
      if (!copy.includes(item)) {
        result.push(item);
      }
    });
    
    if (limit) {
      return result.splice(0, limit);
    } else {
      return result;
    }
  }

}

export const postService = new PostService(postModel);

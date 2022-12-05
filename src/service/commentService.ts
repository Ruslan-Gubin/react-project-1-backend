import { Model } from "mongoose";
import { commentModel } from "../models/index.js";
import { AddLikeCommentBody } from "../types/commentsTypes/AddLikeComment.js";
import { CreaterCommentBody } from "../types/commentsTypes/CreaterComment.js";
import { GetUserCommentsQuery } from "../types/commentsTypes/GetUserCommentsType.js";
import { IComments } from "../types/commentsTypes/IComments.js";

class CommentService {
 
  constructor(private readonly model: Model<IComments>) {} 

  async create(body: CreaterCommentBody): Promise<IComments> {
    const { text, user, target } = body;
    const newComment = await new this.model({ text,  user, target }).save();
    return newComment;
  }

  async getAll(queryStr: string): Promise<IComments[]> {
    const arrComments =  queryStr.split(',')
    if (!arrComments) {
      throw new Error('Данные по запросу комментариев не найдены')
    } else {
      return await this.model.find({_id: arrComments}).sort({ createdAt: -1 }).populate("user").exec();
    }
  }

  async getUserComments(query: GetUserCommentsQuery): Promise<IComments[]> {  
    const userId = query.userId
    const limit = query.limit
    if (!userId) {
      throw new Error('Не указан ID пользователя')
    }
    return await this.model.find({user: {_id: userId}}).limit(limit).sort({ createdAt: -1 }).populate("user").exec() 
  }

  async getOne(id: string): Promise<IComments | null> { 
    const comment = await this.model.findById(id).populate("user");
    return comment;
  }

  async remove(id: string): Promise<any> {
    if (!id) {
      throw new Error("не указан ID");
    }
    const comment = await this.model.findByIdAndDelete(id);
    return comment;
  }

  async removeCommentsForTarget(arr: string[]) {
    if (!arr) {
      throw new Error('Комментарии не найдены')
    }
    return await this.model.deleteMany({_id: arr})
  }

  async update(id: string, updateText: string): Promise<any> {
    if (!id) {
      throw new Error("не указан ID");
    }
    return await this.model.updateOne(
      { _id: id },
      {
        text: updateText,
      }
    );
  }

  async addLike(body: AddLikeCommentBody, user: string): Promise<any> {
    const id =  body._id
    const likesArr =  body.likes

    if (!id) {
      throw new Error('Не найден ID комментария')
    } 
    
    if (likesArr && likesArr.includes(user)) {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { likes: this.filterArrUsers(likesArr, user) },
        { returnDocument: "after" }
        )
        return comment
    } else if (likesArr && !likesArr.includes(user)){
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { likes: [...likesArr,  user] },
        { returnDocument: "after" }
        )
        
        return comment
      }
      }

  async addDislaik(body: AddLikeCommentBody, user: string): Promise<any> {
    const id = body._id
    const disLikesArr = body.dislikes

    if (!id) {
      throw new Error('Не найден ID комментария')
    } 
    
    if (disLikesArr && disLikesArr.includes(user)) {
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { dislikes: this.filterArrUsers(disLikesArr, user) }, 
        { returnDocument: "after" }
        )
        return comment
    } else if (disLikesArr && !disLikesArr.includes(user)){
      const comment = await this.model.findOneAndUpdate(
        {_id: id},
        { dislikes: [...disLikesArr,  user] },
        { returnDocument: "after" }
        )
        return comment
      }
      }


  private filterArrUsers(disLikesArr: string[], user: string): any {
    return disLikesArr.filter(users => users !== user);
  }
}

export const commentService = new CommentService(commentModel);

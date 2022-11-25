import { dialogModel } from "../models/index.js";
import { authService } from "./authService.js";
import { commentService } from "./commentService.js";

class DialogService {
  constructor(options) {
    this.model = options.model;
  }

  async createDialog(req) {
    if (!req.userId && !req.body.targetId) {
      throw new Error("ID одного из пользователей не найдены");
    }

    const userData = req.body.userOne;
    const targetData = req.body.userTwo;

    if (userData.dialogs.includes(...targetData.dialogs)) {
      throw new Error("Такой диалог уже существует");
    } else {
      const newDialog = await this.model({
        userOne: userData,
        userTwo: targetData,
      }).save();

      return newDialog;
    }
  }

  async getOneDialog(req) {
    const id = req.params.id;
    if (!id) {
      throw new Error("Не найден ID диалога");
    }

    const dialog = await this.model.findById(id);

    return dialog;
  }

  async setAddComment(req) {
    const dialogId = req.body.targetId;
    const commentId = req.body.commentId;

    if (!dialogId && !commentId) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: dialogId },
      { $push: { comments: commentId } },
      { returnDocument: "after" }
    );
  }

  async setRemoveComment(req) {
    const targetId = req.body.targetId;
    const newArrComments = req.body.newArrComments;
    console.log(targetId);
    console.log(req.body);
    if (!targetId && !newArrComments) {
      throw new Error("Не указан ID поста или коментария");
    }

    return await this.model.updateOne(
      { _id: targetId },
      { comments: newArrComments },
      { returnDocument: "after" }
    );
  }

  async setDeleteDialog(req) {
    try {
      const dialogId = req.body.dialogId;
      const userOneId = req.body.userOneId;
      const userTwoId = req.body.userTwoId;
      const commentArr = req.body.commentArr;

      await this.model.findByIdAndDelete(dialogId);
      await commentService.removeCommentsForTarget(commentArr);
      await authService.setDeleteDialog(userOneId, userTwoId, dialogId);

      return { success: true, message: `Dialog: ${dialogId} deleted` };
    } catch (error) {
      console.log(error);
    }
  }

  // async getAll(req) {
  //   const category = req.query.category ? req.query.category : false;
  //   const search = req.query.search ? req.query.search.toLowerCase() : "";
  //   const tag = req.query.tags ? req.query.tags : "";
  //   const page = (await req.query.page) ? req.query.page : null;
  //   const perPage = (await req.query.perpage) ? req.query.perpage : null;
  //   const skips = (page - 1) * perPage;

  //   const result = await this.model
  //     .find({ $and: [{ tags: { $regex: tag } }, { title: { $regex: search } }],})
  //     .skip(skips)
  //     .limit(perPage)
  //     .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
  //     .populate("user");

  //   return result;
  // }

  // async getUserPosts(req) {
  //   const category = req.query.category ? req.query.category : false;
  //   const authId = req.query.auth;
  //   const search = req.query.search ? req.query.search.toLowerCase() : "";
  //   const tag = req.query.tags ? req.query.tags : "";
  //   const page = (await req.query.page) ? req.query.page : null;
  //   const perPage = (await req.query.perpage) ? req.query.perpage : null;
  //   const skips = (page - 1) * perPage;

  //   const result = await this.model
  //     .find({
  //       $and: [
  //         { tags: { $regex: tag } },
  //         { user: { _id: authId } },
  //         { title: { $regex: search } },
  //       ],
  //     })
  //     .skip(skips)
  //     .limit(perPage)
  //     .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
  //     .populate("user");

  //   return result;
  // }

  // async getUserPostsLength(req) {
  //   const search = req.query.search ? req.query.search : "";
  //   const tag = req.query.tags ? req.query.tags : "";
  //   if (!req.query.auth) {
  //     throw new Error("Не указан id пользователя");
  //   }
  //   const targetUserId = req.query.auth;
  //   const userPosts = await this.model.find({ $and: [{ tags: { $regex: tag } },{ user: { _id: targetUserId } }, { title: { $regex: search } }],})

  //   if (userPosts.length <= 0) {
  //     return 1
  //   } else {
  //     return userPosts.length;
  //   }
  // }

  // async getLength() {
  //   return await this.model.countDocuments();
  // }

  // async searchTags(req) {
  //   const tag = req.query.tags;
  //   const tags = await this.model.find({ tags: tag });
  //   return tags;
  // }

  // async update(req) {
  //   const postId = req.body.id;
  //   const prevPost = await this.model.findById(postId);
  //   const prevImage = await prevPost.image;

  //   if (prevImage.url === req.body.image) {
  //     return await this.model.updateOne(
  //       { _id: postId },
  //       { ...req.body, image: prevImage }
  //     );
  //   } else {
  //     const imgId = await prevPost.image.public_id;
  //     await cloudinary.uploader.destroy(imgId);

  //     const newImage = await req.body.image;
  //     const result = await cloudinary.uploader.upload(newImage, {
  //       folder: "Posts",
  //       fetch_format: "auto",
  //     });

  //     return await this.model.updateOne(
  //       { _id: postId },
  //       {
  //         ...req.body,
  //         image: { public_id: result.public_id, url: result.secure_url },
  //       }
  //     );
  //   }
  // }

  // async setUpdateLikes(req) {
  //   const id = req.body._id;
  //   const likesArr = await req.body.likes;
  //   const user = await req.userId;

  //   if (!id) {
  //     throw new Error("ID поста не найден");
  //   }

  //   if (likesArr.includes(user)) {
  //     const post = await this.model.findOneAndUpdate(
  //       { _id: id },
  //       { likes: likesArr.filter((users) => users !== user) },
  //       { returnDocument: "after" }
  //     );
  //     return post;
  //   } else {
  //     const post = await this.model.findOneAndUpdate(
  //       { _id: id },
  //       { likes: [...likesArr, user] },
  //       { returnDocument: "after" }
  //     );
  //     return post;
  //   }
  // }

  // async setUpdateDislike(req) {
  //   const id = req.body._id;
  //   const likesArr = await req.body.dislikes;
  //   const user = await req.userId;

  //   if (!id) {
  //     throw new Error("ID поста не найден");
  //   }

  //   if (likesArr.includes(user)) {
  //     const post = await this.model.findOneAndUpdate(
  //       { _id: id },
  //       { dislikes: likesArr.filter((users) => users !== user) },
  //       { returnDocument: "after" }
  //     );
  //     return post;
  //   } else {
  //     const post = await this.model.findOneAndUpdate(
  //       { _id: id },
  //       { dislikes: [...likesArr, user] },
  //       { returnDocument: "after" }
  //     );
  //     return post;
  //   }
  // }

  // async getTags(req) {
  //   const userId = req.query.userId;
  //   const limit = req.query.limit;
  //   const result = [];
  //   const filterTags = [];

  //   const arrayTags = await this.model
  //     .find({ user: { _id: userId } }, { tags: true, _id: false })
  //     .sort({ createdAt: -1 });

  //   const tags = arrayTags.map((obj) => obj.tags.join("").trim().split(" "));

  //   tags.map((item) => (item ? filterTags.push(...item) : false));

  //   const setTags = new Set(filterTags);

  //   for (const key of setTags) {
  //     if (key) {
  //       result.push(key);
  //     }
  //   }

  //   if (limit) {
  //     return result.splice(0, limit);
  //   } else {
  //     return result;
  //   }
  // }
}

export const dialogService = new DialogService({ model: dialogModel });

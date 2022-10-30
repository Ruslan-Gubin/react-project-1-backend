import { postModel } from "../models/index.js";

class PostService {
 
  constructor(options) {
    this.model = options.model
    this.allposts = []
  }

async  getAllPost() {
  return  await this.model.find().sort({ createdAt: -1 }).populate("user").exec();
  }

  async create(req) {
    const user = req.userId;
    const newPost = await new this.model({ ...req.body, user }).save();
    return newPost;
  }

  async getAll(req) {
    const views = req.query.views ? req.query.views : false;
    const search  = req.query.search ? req.query.search.toLowerCase() : '';
    const tag = req.query.tags ? req.query.tags : false;

   console.log(tag); //3tags
   console.log(search); //tes
   console.log(views); // -1
   

     
   
 this.allposts = await this.model.find({$or: [ {tags: tag ? tag : null},{title: search ? search : null}]} ).sort(views ? {viewsCount: views} : {createdAt: -1})
//  this.allposts = await this.model.find(tag ? {tags: tag} : null || search ? {title: search} : null ).sort(views ? {viewsCount: views} : {createdAt: -1})
      
  
    // const searchText = this.allposts.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    
 
    return this.allposts;
    // return searchText;
  }

  async searchTags(req) {
    const tag = req.query.tags
    const tags = await this.model.find({tags: tag})
    return tags
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
    const post = await this.model.updateOne(
      { _id: postId },
      {...req.body}
      );  
    return post;
  }

  async getTags(req) {
    const limit = req.query.limit
    const result = [];
    const filterTags = [];

    const arrayTags = await this.model.find({},{tags: true, _id: false}).sort({createdAt: -1})

    const tags = arrayTags.map((obj) => obj.tags.join("").trim().split(" "));

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

export const postService = new PostService({model: postModel});

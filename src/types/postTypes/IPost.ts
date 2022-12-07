import { Types } from "mongoose";

interface IPost {
  _id: string;
  title: string;
  text: string;
  image: {
    public_id: string
    url: string
  }
  user: Types.ObjectId
  viewsCount: number
  updatedAt: string
  tags: string[] 
  comments: string[] 
  likes: string[]
  dislikes: string[]
  __v: number
}

export type {IPost}
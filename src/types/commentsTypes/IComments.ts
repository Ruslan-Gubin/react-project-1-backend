import { Types } from "mongoose"

interface IComments {
  createdAt: string
  text:string
  target: { category: string,_id: string }
  likes: string[]
  dislikes: string[]
  user: Types.ObjectId
  _id: string
}

export type {IComments}
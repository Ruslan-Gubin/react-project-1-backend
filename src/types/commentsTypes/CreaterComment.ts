import { IUser } from "../userType/index.js"

interface CreaterCommentBody {
  text: string
  user: IUser
  target: { _id: string, category: string }
}



export type {CreaterCommentBody}
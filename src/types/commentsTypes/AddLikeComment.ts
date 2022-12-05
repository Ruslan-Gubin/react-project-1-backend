

interface AddLikeCommentBody {
  _id: string
  likes?: string[]
  dislikes?: string[]
  userId: string
}

export type {AddLikeCommentBody}
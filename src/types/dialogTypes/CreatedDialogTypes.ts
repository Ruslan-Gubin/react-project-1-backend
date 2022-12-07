

interface CreatedDialogBody {
  userOne: {
    image: {
      public_id: string
      url: string
    },
    _id: string
    fullName: string
    email: string
    requestFriends: string[]
    friends: string[]
    online: boolean
    dialogs: string[]
    createdAt: string
    updatedAt: string
    __v: number
  },
  userTwo: {
    image: {
      public_id: string
      url: string
    },
    _id: string
    fullName: string
    email: string
    requestFriends: [],
    friends: string[],
    online: boolean,
    dialogs: string[],
    createdAt: string
    updatedAt: string
    __v: number
}
}

export type {CreatedDialogBody}
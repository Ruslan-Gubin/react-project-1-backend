

interface IUser {
  image: {public_id: string, url: string}
  _id: string
  fullName: string
  email: string
  requestFriends: string[]
  friends: string[]
  dialogs: string[]
  online: boolean
  createdAt: string
  updatedAt: string
  passwordHash?: string
  token: string
  _doc: IUser
}

export type {IUser}
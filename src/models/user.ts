import mongoose from "mongoose";
import { IUser } from "../types/userType/index.js";

const UserShema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true, //уникальное значение
    },
    passwordHash: { 
      type: String,
      require: true,
    },
    requestFriends: {
      type: [String],
      default: [],
    },
    friends: {
      type: [String],
      default: [],
    },
    online: {
      type: Boolean,
      default: false,
    },
    dialogs: {
      type: [String],
      default: [],
    },
    image: {
      public_id: {
        type: String,
        require: true, 
      },
      url: {
        type: String,
        require: true, 
      }
    }, 
  },
  { timestamps: true }// дата создания
);

export const userModel = mongoose.model<IUser>("User", UserShema);

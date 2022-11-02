import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
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

export const userModel = mongoose.model("User", UserShema);

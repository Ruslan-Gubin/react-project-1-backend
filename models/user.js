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
    avatarUrl: String,
  },
  { timestamps: true }// дата создания
);

export default mongoose.model("User", UserShema);

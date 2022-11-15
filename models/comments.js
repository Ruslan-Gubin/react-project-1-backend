import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  dislikes: {
    type: Array,
    default: [],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{ timestamps: true },
);

export const commentModel = mongoose.model("Comment", commentSchema);  
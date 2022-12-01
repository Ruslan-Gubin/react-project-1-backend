import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  dislikes: {
    type: Array,
    default: [],
  },
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    public_id:{
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
},
{ timestamps: true },
);

export const postModel = mongoose.model("Post", postSchema);

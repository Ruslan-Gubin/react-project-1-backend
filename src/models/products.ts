import mongoose from "mongoose";
import { IProduct } from "../types/productTypes/index.js";
const Schema = mongoose.Schema;

const productsSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    comments: {
    type: [String],
    default: [],
    },
    description: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [{ 
        public_id:{type: String, required: true},
        url: {type: String,required: true}
      }],
    default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: Number,
    quantity: {
      type: Number,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model<IProduct>("Products", productsSchema);

export {productModel}
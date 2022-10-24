import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    types: {
      type: Object,
      color: {
        type: Array,
      },
      size: {
        type: Array,
      },
    },
    images: {
      type: Array,
      required: true,
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
    discount: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Products", productsSchema);

import mongoose from "mongoose";
var Schema = mongoose.Schema;
var productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
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
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
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
    viewsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
export var productModel = mongoose.model("Products", productsSchema);

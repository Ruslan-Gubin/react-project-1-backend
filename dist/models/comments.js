import mongoose from "mongoose";
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    target: {
        type: {
            category: String,
            _id: String,
        }
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
export var commentModel = mongoose.model("Comment", commentSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const dialogSchema = new Schema({
    comments: {
        type: [String],
        default: [],
    },
    userOne: {
        dialogs: {
            type: [String],
            default: [],
        },
        _id: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        image: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    },
    userTwo: {
        dialogs: {
            type: [String],
            default: [],
        },
        _id: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        image: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
    },
}, { timestamps: true });
export const dialogModel = mongoose.model("Dialog", dialogSchema);

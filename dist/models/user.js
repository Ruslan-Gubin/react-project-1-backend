import mongoose from "mongoose";
const UserShema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
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
}, { timestamps: true });
export const userModel = mongoose.model("User", UserShema);

import mongoose from "mongoose";
var UserShema = new mongoose.Schema({
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
    requestFriends: {
        type: Array,
        default: [],
    },
    friends: {
        type: Array,
        default: [],
    },
    online: {
        type: Boolean,
        default: false,
    },
    dialogs: {
        type: Array,
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
}, { timestamps: true } // дата создания
);
export var userModel = mongoose.model("User", UserShema);

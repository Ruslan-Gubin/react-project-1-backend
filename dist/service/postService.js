var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { postModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";
import { commentService } from "./commentService.js";
var PostService = /** @class */ (function () {
    function PostService(options) {
        this.model = options.model;
    }
    PostService.prototype.getAllPost = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var searchPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchPost = req.query.searchPost;
                        if (!searchPost) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.model
                                .find({ title: { $regex: "".concat(searchPost), $options: "i" } })
                                .sort({ createdAt: -1 })
                                .populate("user")
                                .exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostService.prototype.create = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var image, user, result, newPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        image = req.body.image;
                        user = req.userId;
                        return [4 /*yield*/, cloudinary.uploader.upload(image, {
                                folder: "Posts",
                            })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.model(__assign(__assign({}, req.body), { user: user, image: { public_id: result.public_id, url: result.secure_url } })).save()];
                    case 2:
                        newPost = _a.sent();
                        return [2 /*return*/, newPost];
                }
            });
        });
    };
    PostService.prototype.getAll = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var category, search, tag, page, perPage, skips, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = req.query.categor ? req.query.categor : false;
                        search = req.query.search ? req.query.search : "";
                        tag = req.query.tags ? req.query.tags : "";
                        return [4 /*yield*/, req.query.page];
                    case 1:
                        page = (_a.sent()) ? req.query.page : null;
                        return [4 /*yield*/, req.query.perpage];
                    case 2:
                        perPage = (_a.sent()) ? req.query.perpage : null;
                        skips = (page - 1) * perPage;
                        return [4 /*yield*/, this.model
                                .find({
                                $and: [
                                    { tags: { $regex: tag } },
                                    { title: { $regex: "".concat(search), $options: "i" } },
                                ],
                            })
                                .skip(skips)
                                .limit(perPage)
                                .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
                                .populate("user")];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PostService.prototype.getUserPosts = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var category, authId, search, tag, page, perPage, skips, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = req.query.categor ? req.query.categor : false;
                        authId = req.query.auth;
                        search = req.query.search ? req.query.search : "";
                        tag = req.query.tags ? req.query.tags : "";
                        return [4 /*yield*/, req.query.page];
                    case 1:
                        page = (_a.sent()) ? req.query.page : null;
                        return [4 /*yield*/, req.query.perpage];
                    case 2:
                        perPage = (_a.sent()) ? req.query.perpage : null;
                        skips = (page - 1) * perPage;
                        return [4 /*yield*/, this.model
                                .find({
                                $and: [
                                    { tags: { $regex: tag } },
                                    { user: { _id: authId } },
                                    { title: { $regex: "".concat(search), $options: "i" } },
                                ],
                            })
                                .skip(skips)
                                .limit(perPage)
                                .sort(category == "popular" ? { viewsCount: -1 } : { createdAt: -1 })
                                .populate("user")];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PostService.prototype.getUserPostsLength = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var search, tag, targetUserId, userPosts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        search = req.query.search ? req.query.search : "";
                        tag = req.query.tags ? req.query.tags : "";
                        if (!req.query.auth) {
                            throw new Error("Не указан id пользователя");
                        }
                        targetUserId = req.query.auth;
                        return [4 /*yield*/, this.model.find({
                                $and: [
                                    { tags: { $regex: tag } },
                                    { user: { _id: targetUserId } },
                                    { title: { $regex: "".concat(search), $options: "i" } },
                                ],
                            })];
                    case 1:
                        userPosts = _a.sent();
                        if (userPosts.length <= 0) {
                            return [2 /*return*/, 1];
                        }
                        else {
                            return [2 /*return*/, userPosts.length];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PostService.prototype.getLength = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.countDocuments()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostService.prototype.searchTags = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var tag, tags;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tag = req.query.tags;
                        return [4 /*yield*/, this.model.find({ tags: tag })];
                    case 1:
                        tags = _a.sent();
                        return [2 /*return*/, tags];
                }
            });
        });
    };
    PostService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error("Не найден ID");
                        }
                        return [4 /*yield*/, this.model
                                .findOneAndUpdate({ _id: id }, { $inc: { viewsCount: 1 } }, { returnDocument: "after" })
                                .populate("user")];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostService.prototype.remove = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var postComments, commentsArr, post, imgId, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.model.find({ _id: req.params.id }, { _id: false, comments: true })];
                    case 1:
                        postComments = _a.sent();
                        commentsArr = postComments[0].comments;
                        commentService.removeCommentsForTarget(commentsArr);
                        return [4 /*yield*/, this.model.findByIdAndDelete(req.params.id)];
                    case 2:
                        post = _a.sent();
                        imgId = post.image.public_id;
                        return [4 /*yield*/, cloudinary.uploader.destroy(imgId)];
                    case 3:
                        _a.sent(); // delete image cloudinary
                        return [2 /*return*/, { success: true, message: "Post deleted" }];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PostService.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, prevPost, prevImage, imgId, newImage, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.body.id;
                        return [4 /*yield*/, this.model.findById(postId)];
                    case 1:
                        prevPost = _a.sent();
                        return [4 /*yield*/, prevPost.image];
                    case 2:
                        prevImage = _a.sent();
                        if (!(prevImage.url === req.body.image)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.updateOne({ _id: postId }, __assign(__assign({}, req.body), { image: prevImage }))];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [4 /*yield*/, prevPost.image.public_id];
                    case 5:
                        imgId = _a.sent();
                        return [4 /*yield*/, cloudinary.uploader.destroy(imgId)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, req.body.image];
                    case 7:
                        newImage = _a.sent();
                        return [4 /*yield*/, cloudinary.uploader.upload(newImage, {
                                folder: "Posts",
                                fetch_format: "auto",
                            })];
                    case 8:
                        result = _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: postId }, __assign(__assign({}, req.body), { image: { public_id: result.public_id, url: result.secure_url } }))];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostService.prototype.setAddComment = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, commentId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.body.targetId;
                        commentId = req.body.commentId;
                        if (!postId && !commentId) {
                            throw new Error("Не указан ID поста или коментария");
                        }
                        return [4 /*yield*/, this.model.updateOne({ _id: postId }, { $push: { comments: commentId } })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostService.prototype.setRemoveComment = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, newArrComments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postId = req.body.targetId;
                        newArrComments = req.body.newArrComments;
                        if (!postId && !commentId) {
                            throw new Error("Не указан ID поста или коментария");
                        }
                        return [4 /*yield*/, this.model.updateOne({ _id: postId }, { comments: newArrComments })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PostService.prototype.setUpdateLikes = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, likesArr, user, post, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body._id;
                        return [4 /*yield*/, req.body.likes];
                    case 1:
                        likesArr = _a.sent();
                        return [4 /*yield*/, req.userId];
                    case 2:
                        user = _a.sent();
                        if (!id) {
                            throw new Error("ID поста не найден");
                        }
                        if (!likesArr.includes(user)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { likes: likesArr.filter(function (users) { return users !== user; }) }, { returnDocument: "after" })];
                    case 3:
                        post = _a.sent();
                        return [2 /*return*/, post];
                    case 4: return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { likes: __spreadArray(__spreadArray([], __read(likesArr), false), [user], false) }, { returnDocument: "after" })];
                    case 5:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostService.prototype.setUpdateDislike = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, likesArr, user, post, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body._id;
                        return [4 /*yield*/, req.body.dislikes];
                    case 1:
                        likesArr = _a.sent();
                        return [4 /*yield*/, req.userId];
                    case 2:
                        user = _a.sent();
                        if (!id) {
                            throw new Error("ID поста не найден");
                        }
                        if (!likesArr.includes(user)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { dislikes: likesArr.filter(function (users) { return users !== user; }) }, { returnDocument: "after" })];
                    case 3:
                        post = _a.sent();
                        return [2 /*return*/, post];
                    case 4: return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { dislikes: __spreadArray(__spreadArray([], __read(likesArr), false), [user], false) }, { returnDocument: "after" })];
                    case 5:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostService.prototype.getTags = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, limit, result, filterTags, arrayTags, tags, setTags, setTags_1, setTags_1_1, key;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userId = req.query.userId;
                        limit = req.query.limit;
                        result = [];
                        filterTags = [];
                        return [4 /*yield*/, this.model
                                .find({ user: { _id: userId } }, { tags: true, _id: false })
                                .sort({ createdAt: -1 })];
                    case 1:
                        arrayTags = _b.sent();
                        tags = arrayTags.map(function (obj) { return obj.tags.join("").trim().split(" "); });
                        tags.map(function (item) { return (item ? filterTags.push.apply(filterTags, __spreadArray([], __read(item), false)) : false); });
                        setTags = new Set(filterTags);
                        try {
                            for (setTags_1 = __values(setTags), setTags_1_1 = setTags_1.next(); !setTags_1_1.done; setTags_1_1 = setTags_1.next()) {
                                key = setTags_1_1.value;
                                if (key) {
                                    result.push(key);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (setTags_1_1 && !setTags_1_1.done && (_a = setTags_1.return)) _a.call(setTags_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (limit) {
                            return [2 /*return*/, result.splice(0, limit)];
                        }
                        else {
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostService;
}());
export var postService = new PostService({ model: postModel });

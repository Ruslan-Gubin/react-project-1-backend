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
import { commentModel } from "../models/index.js";
var CommentService = /** @class */ (function () {
    function CommentService(model) {
        this.model = model;
    }
    CommentService.prototype.create = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var text, user, target, newComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        text = body.text, user = body.user, target = body.target;
                        return [4 /*yield*/, new this.model({ text: text, user: user, target: target }).save()];
                    case 1:
                        newComment = _a.sent();
                        return [2 /*return*/, newComment];
                }
            });
        });
    };
    CommentService.prototype.getAll = function (queryStr) {
        return __awaiter(this, void 0, void 0, function () {
            var arrComments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arrComments = queryStr.split(',');
                        if (!!arrComments) return [3 /*break*/, 1];
                        throw new Error('Данные по запросу комментариев не найдены');
                    case 1: return [4 /*yield*/, this.model.find({ _id: arrComments }).sort({ createdAt: -1 }).populate("user").exec()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentService.prototype.getUserComments = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, limit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = query.userId;
                        limit = query.limit;
                        if (!userId) {
                            throw new Error('Не указан ID пользователя');
                        }
                        return [4 /*yield*/, this.model.find({ user: { _id: userId } }).limit(limit).sort({ createdAt: -1 }).populate("user").exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentService.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.model.findById(id).populate("user")];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                }
            });
        });
    };
    CommentService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error("не указан ID");
                        }
                        return [4 /*yield*/, this.model.findByIdAndDelete(id)];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                }
            });
        });
    };
    CommentService.prototype.removeCommentsForTarget = function (arr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!arr) {
                            throw new Error('Комментарии не найдены');
                        }
                        return [4 /*yield*/, this.model.deleteMany({ _id: arr })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentService.prototype.update = function (id, updateText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            throw new Error("не указан ID");
                        }
                        return [4 /*yield*/, this.model.updateOne({ _id: id }, {
                                text: updateText,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentService.prototype.addLike = function (body, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, likesArr, comment, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = body._id;
                        likesArr = body.likes;
                        if (!id) {
                            throw new Error('Не найден ID комментария');
                        }
                        if (!(likesArr && likesArr.includes(user))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { likes: this.filterArrUsers(likesArr, user) }, { returnDocument: "after" })];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                    case 2:
                        if (!(likesArr && !likesArr.includes(user))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { likes: __spreadArray(__spreadArray([], __read(likesArr), false), [user], false) }, { returnDocument: "after" })];
                    case 3:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommentService.prototype.addDislaik = function (body, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, disLikesArr, comment, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = body._id;
                        disLikesArr = body.dislikes;
                        if (!id) {
                            throw new Error('Не найден ID комментария');
                        }
                        if (!(disLikesArr && disLikesArr.includes(user))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { dislikes: this.filterArrUsers(disLikesArr, user) }, { returnDocument: "after" })];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                    case 2:
                        if (!(disLikesArr && !disLikesArr.includes(user))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { dislikes: __spreadArray(__spreadArray([], __read(disLikesArr), false), [user], false) }, { returnDocument: "after" })];
                    case 3:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CommentService.prototype.filterArrUsers = function (disLikesArr, user) {
        return disLikesArr.filter(function (users) { return users !== user; });
    };
    return CommentService;
}());
export var commentService = new CommentService(commentModel);

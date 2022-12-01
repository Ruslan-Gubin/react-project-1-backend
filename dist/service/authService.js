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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/index.js";
import { cloudinary } from "../utils/cloudinary.js";
var AuthService = /** @class */ (function () {
    function AuthService(options) {
        this.model = options.model;
    }
    AuthService.prototype.getToken = function (id) {
        return jwt.sign({ _id: id }, process.env.SECRET_TOKEN, {
            expiresIn: "30d",
        });
    };
    AuthService.prototype.create = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var pas, salt, passwordBcrypt, image, resImage, newUser, user, token, _a, passwordHash, userData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pas = req.body.password;
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 1:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt.hash(pas, salt)];
                    case 2:
                        passwordBcrypt = _b.sent();
                        image = req.body.image;
                        return [4 /*yield*/, cloudinary.uploader.upload(image, {
                                folder: "Users",
                            })];
                    case 3:
                        resImage = _b.sent();
                        return [4 /*yield*/, this.model(__assign(__assign({}, req.body), { image: { public_id: resImage.public_id, url: resImage.secure_url }, passwordHash: passwordBcrypt }))];
                    case 4:
                        newUser = _b.sent();
                        return [4 /*yield*/, newUser.save()];
                    case 5:
                        user = _b.sent();
                        token = this.getToken(user._id);
                        _a = user._doc, passwordHash = _a.passwordHash, userData = __rest(_a, ["passwordHash"]);
                        return [2 /*return*/, __assign(__assign({}, userData), { token: token })];
                }
            });
        });
    };
    AuthService.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValidPass, token, _a, passwordHash, userData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.body.email) {
                            throw new Error("Не найден E-Mail пользователя");
                        }
                        return [4 /*yield*/, this.model.findOne({ email: req.body.email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Неверный логин или пароль");
                        }
                        return [4 /*yield*/, bcrypt.compare(req.body.password, user._doc.passwordHash)];
                    case 2:
                        isValidPass = _b.sent();
                        if (!isValidPass) {
                            throw new Error("Неверный логин или пароль");
                        }
                        token = this.getToken(user._id);
                        _a = user._doc, passwordHash = _a.passwordHash, userData = __rest(_a, ["passwordHash"]);
                        return [2 /*return*/, __assign(__assign({}, userData), { token: token })];
                }
            });
        });
    };
    AuthService.prototype.getUser = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, passwordHash, userData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.userId) {
                            throw new Error("Пользователь не найден");
                        }
                        return [4 /*yield*/, this.model.findById(req.userId)];
                    case 1:
                        user = _b.sent();
                        _a = user._doc, passwordHash = _a.passwordHash, userData = __rest(_a, ["passwordHash"]);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    AuthService.prototype.getUserSinglPage = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, _a, passwordHash, userData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            throw new Error("Пользователь не найден");
                        }
                        return [4 /*yield*/, this.model.findById(id)];
                    case 1:
                        user = _b.sent();
                        _a = user._doc, passwordHash = _a.passwordHash, userData = __rest(_a, ["passwordHash"]);
                        return [2 /*return*/, userData];
                }
            });
        });
    };
    AuthService.prototype.getAllUsers = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var searchFullname, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchFullname = req.query.userFullName;
                        if (searchFullname.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.model.find({ fullName: { $regex: "".concat(searchFullname), $options: 'i' } })
                                .sort({ createdAt: -1 })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    AuthService.prototype.setFriendRequest = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, requestFriendsArr, guestId, user, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (req.body.targerId && req.body.guest) {
                            throw new Error("Не указан ID гостя или пользователя");
                        }
                        userId = req.body.user._id;
                        requestFriendsArr = req.body.user.requestFriends;
                        guestId = req.body.guest;
                        if (!requestFriendsArr.includes(guestId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: userId }, {
                                requestFriends: requestFriendsArr.filter(function (item) { return item !== guestId; }),
                            }, { returnDocument: "after" })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2: return [4 /*yield*/, this.model.findOneAndUpdate({ _id: userId }, { requestFriends: __spreadArray(__spreadArray([], __read(requestFriendsArr), false), [guestId], false) }, { returnDocument: "after" })];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService.prototype.setRemoveFriendRequest = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, removeId, usersArrId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        removeId = req.body.removeId;
                        usersArrId = req.body.usersArrId;
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: userId }, { requestFriends: usersArrId.filter(function (item) { return item !== removeId; }) }, { returnDocument: "after" })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.prototype.setAddFriend = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, targetId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        targetId = req.body.targetId;
                        return [4 /*yield*/, this.model.updateOne({ _id: userId }, { $addToSet: { friends: targetId }, $pull: { requestFriends: targetId } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: targetId }, { $addToSet: { friends: userId }, $pull: { requestFriends: userId } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setAddDialog = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userOneId, userTwoId, dialogId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userOneId = req.body.userOneId;
                        userTwoId = req.body.userTwoId;
                        dialogId = req.body.dialogId;
                        return [4 /*yield*/, this.model.updateOne({ _id: userOneId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: "after" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: userTwoId }, { $addToSet: { dialogs: dialogId } }, { returnDocument: "after" })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setDeleteDialog = function (userOneId, userTwoId, dialogId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.model.updateOne({ _id: userOneId }, { $pull: { dialogs: dialogId } }, { returnDocument: "after" })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: userTwoId }, { $pull: { dialogs: dialogId } }, { returnDocument: "after" })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setDeleteFriend = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, guestId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.userId && !req.body.guest) {
                            throw new Error('Не указан ID пользователя или гостя');
                        }
                        userId = req.body.userId;
                        guestId = req.body.guest;
                        return [4 /*yield*/, this.model.updateOne({ _id: userId }, { $pull: { friends: guestId } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: guestId }, { $pull: { friends: userId } })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setAuthOnline = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = req.body.status;
                        console.log(status);
                        if (status !== false && status !== true) {
                            throw new Error('Не удалось получить статус пользователя');
                        }
                        return [4 /*yield*/, this.model.updateOne({ _id: req.userId }, { $set: { online: status } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, status];
                }
            });
        });
    };
    AuthService.prototype.getUsersLikes = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var usersId, userArrId, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.query.usersIdArr];
                    case 1:
                        usersId = _a.sent();
                        if (!usersId) {
                            throw new Error("запашиваемые пользователи не найдены");
                        }
                        userArrId = usersId.split(",");
                        return [4 /*yield*/, this.model.find({ _id: { $in: userArrId } }, { image: true })];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    AuthService.prototype.getUsersArray = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, usersId, userArrId, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = req.query.limit;
                        return [4 /*yield*/, req.query.arr];
                    case 1:
                        usersId = _a.sent();
                        if (!usersId) {
                            throw new Error("запашиваемые пользователи не найдены");
                        }
                        userArrId = usersId.split(",");
                        return [4 /*yield*/, this.model.find({ _id: { $in: userArrId } }, { passwordHash: false }).limit(limit)];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    AuthService.prototype.remove = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var idAuth, auth, imageId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        idAuth = req.query.id;
                        return [4 /*yield*/, this.model.findByIdAndDelete(idAuth)];
                    case 1:
                        auth = _a.sent();
                        imageId = auth.image.public_id;
                        return [4 /*yield*/, cloudinary.uploader.destroy(imageId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: true, message: "user deleted" }];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getAllEmail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, emails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.model.find({}, { email: true, _id: false })];
                    case 1:
                        emails = _a.sent();
                        emails.forEach(function (item) { return result.push(item.email); });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AuthService.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var idAuth, pas, salt, passwordBcrypt, prevAuth, prevImage, imgId, newAvatar, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idAuth = req.body.id;
                        pas = req.body.password;
                        return [4 /*yield*/, bcrypt.genSalt(7)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(pas, salt)];
                    case 2:
                        passwordBcrypt = _a.sent();
                        return [4 /*yield*/, this.model.findOne({ _id: idAuth })];
                    case 3:
                        prevAuth = _a.sent();
                        return [4 /*yield*/, prevAuth.image];
                    case 4:
                        prevImage = _a.sent();
                        if (!(req.body.image === req.body.prevImage)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.model.updateOne({ _id: idAuth }, __assign(__assign({}, req.body), { passwordHash: passwordBcrypt, image: prevImage }))];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        if (!(prevImage.url !== req.body.image)) return [3 /*break*/, 12];
                        return [4 /*yield*/, prevAuth.image.public_id];
                    case 7:
                        imgId = _a.sent();
                        return [4 /*yield*/, cloudinary.uploader.destroy(imgId)];
                    case 8:
                        _a.sent(); // remove prev avatar
                        return [4 /*yield*/, req.body.image];
                    case 9:
                        newAvatar = _a.sent();
                        return [4 /*yield*/, cloudinary.uploader.upload(newAvatar, {
                                folder: "Users",
                                fetch_format: "auto",
                            })];
                    case 10:
                        result = _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: idAuth }, __assign(__assign({}, req.body), { passwordHash: passwordBcrypt, image: { public_id: result.public_id, url: result.secure_url } }))];
                    case 11: return [2 /*return*/, _a.sent()];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
export var authService = new AuthService({ model: userModel });

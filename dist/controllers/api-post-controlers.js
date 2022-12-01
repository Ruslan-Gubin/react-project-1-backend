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
import { handleError } from "../utils/index.js";
import { postService } from "../service/index.js";
var PostController = /** @class */ (function () {
    function PostController() {
    }
    PostController.prototype.createPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .create(req)
                            .then(function (post) { return res.status(201).json(post); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось создать статью");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getAllPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getAllPost(req)
                            .then(function (posts) { return res.status(200).json(posts); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось найти статьи");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getAllGlobalPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getAll(req)
                            .then(function (posts) { return res.status(200).json(posts); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось найти статьи");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getUserPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getUserPosts(req)
                            .then(function (posts) { return res.status(200).json(posts); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось найти статьи");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getUserPostsLength = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getUserPostsLength(req)
                            .then(function (length) { return res.status(200).json(length); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось найти длину данных");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getLenght = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getLength()
                            .then(function (length) { return res.status(200).json(length); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось найти длину данных");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getOnePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .findOne(req.params.id)
                            .then(function (post) { return res.status(200).json(post); })
                            .catch(function (error) { return handleError(res, error.message, "Статья не найдена"); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.deletePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .remove(req)
                            .then(function () { return res.status(200).json({ id: req.params.id, success: true }); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось удалить статью");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.updatePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .update(req)
                            .then(function () { return res.status(200).json({ success: true }); })
                            .catch(function (error) { return handleError(res, error, "Не удалось обновить статью"); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.setAddComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .setAddComment(req)
                            .then(function () { return res.status(200).json({ success: true }); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось добавить комментарий");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.setRemoveComment = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .setRemoveComment(req)
                            .then(function () { return res.status(200).json({ success: true }); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось удалить комментарий");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.setUpdateLikes = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .setUpdateLikes(req)
                            .then(function () { return res.status(200).json({ success: true }); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось добавить лайк");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.setUpdateDislike = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .setUpdateDislike(req)
                            .then(function () { return res.status(200).json({ success: true }); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось добавить лайк");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostController.prototype.getTags = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, postService
                            .getTags(req)
                            .then(function (tags) { return res.status(200).json(tags); })
                            .catch(function (error) {
                            return handleError(res, error.message, "Не удалось получить тег");
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PostController;
}());
export var postController = new PostController();

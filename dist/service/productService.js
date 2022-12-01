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
import { productModel } from "../models/index.js";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../utils/cloudinaryImagesMethod.js";
import { commentService } from "./commentService.js";
var ProductService = /** @class */ (function () {
    function ProductService(options) {
        this.model = options.model;
    }
    ProductService.prototype.getAllSortProducts = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var department, searchTitle, category, select, optionSelect, perPage, page, skips, totalLength, length, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        department = req.query.department;
                        searchTitle = req.query.textSearch ? req.query.textSearch : "";
                        category = req.query.category !== "Все" ? req.query.category : "";
                        select = req.query.select;
                        optionSelect = {
                            updateDate: { createdAt: -1 },
                            minPrice: { price: 1 },
                            maxPrice: { price: -1 },
                            discounts: { discount: 1 },
                        };
                        perPage = req.query.perPage;
                        page = req.query.page;
                        skips = (page - 1) * perPage;
                        return [4 /*yield*/, this.model.find({
                                $and: [
                                    { department: department },
                                    { title: { $regex: "".concat(searchTitle), $options: "i" } },
                                    { category: { $regex: "".concat(category) } },
                                ],
                            })];
                    case 1:
                        totalLength = _a.sent();
                        length = totalLength.length;
                        return [4 /*yield*/, this.model
                                .find({
                                $and: [
                                    { department: department },
                                    { title: { $regex: "".concat(searchTitle), $options: "i" } },
                                    { category: { $regex: "".concat(category) } },
                                ],
                            })
                                .sort(optionSelect[select])
                                .skip(skips)
                                .limit(perPage)];
                    case 2:
                        products = _a.sent();
                        return [2 /*return*/, { data: products, length: length }];
                }
            });
        });
    };
    ProductService.prototype.getOneId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, veiwsUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id) {
                            throw new Error("Не найден Id продукта");
                        }
                        return [4 /*yield*/, this.model.findOneAndUpdate({ _id: id }, { $inc: { viewsCount: 1 } }, { returnDocument: 'after' })];
                    case 1:
                        veiwsUpdate = _a.sent();
                        return [2 /*return*/, veiwsUpdate];
                }
            });
        });
    };
    ProductService.prototype.getCatigoriesInDepartment = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var department, departmentArr, filterArrSet, map, addAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        department = req.query.department;
                        if (!department) {
                            throw new Error("Department не указан");
                        }
                        return [4 /*yield*/, this.model.find({ department: department }, { _id: false, category: 1 })];
                    case 1:
                        departmentArr = _a.sent();
                        filterArrSet = [];
                        departmentArr.forEach(function (item) {
                            var copyFilterArrSet = filterArrSet;
                            if (!copyFilterArrSet.includes(item.category)) {
                                filterArrSet.push(item.category);
                            }
                        });
                        map = filterArrSet.map(function (item) {
                            return (item = { label: item, value: item });
                        });
                        addAll = __spreadArray([{ label: "Все", value: "Все" }], __read(map), false);
                        return [2 /*return*/, addAll];
                }
            });
        });
    };
    ProductService.prototype.addProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, department, title, description, price, oldPrice, quantity, newCategory, select, category, discount, imageUrl, files, files_1, files_1_1, file, newImage, e_1_1, newProduct;
            var e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, department = _a.department, title = _a.title, description = _a.description, price = _a.price, oldPrice = _a.oldPrice, quantity = _a.quantity, newCategory = _a.newCategory, select = _a.select;
                        category = newCategory ? newCategory : select.value;
                        discount = Math.ceil(((price - oldPrice) / oldPrice) * 100);
                        imageUrl = [];
                        files = req.body.images;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, 7, 8]);
                        files_1 = __values(files), files_1_1 = files_1.next();
                        _c.label = 2;
                    case 2:
                        if (!!files_1_1.done) return [3 /*break*/, 5];
                        file = files_1_1.value;
                        return [4 /*yield*/, cloudinaryImagesMethod(file, "Products")];
                    case 3:
                        newImage = _c.sent();
                        imageUrl.push(newImage);
                        _c.label = 4;
                    case 4:
                        files_1_1 = files_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (files_1_1 && !files_1_1.done && (_b = files_1.return)) _b.call(files_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [4 /*yield*/, this.model.create({
                            department: department,
                            title: title,
                            price: price,
                            oldPrice: oldPrice,
                            quantity: quantity,
                            discount: discount,
                            description: description,
                            category: category,
                            images: imageUrl.map(function (item) { return item; }),
                        })];
                    case 9:
                        newProduct = _c.sent();
                        return [2 /*return*/, newProduct];
                }
            });
        });
    };
    ProductService.prototype.removeProduct = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _id, images, comments, images_1, images_1_1, item, imgPublicId;
            var e_2, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, _id = _a._id, images = _a.images, comments = _a.comments;
                        return [4 /*yield*/, this.model.findByIdAndDelete(_id) // remove Product
                                .catch(function (error) { return console.log(error); })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, commentService.removeCommentsForTarget(comments)
                                .catch(function (error) { return console.log(error); })]; //remove comments Product
                    case 2:
                        _c.sent(); //remove comments Product
                        try {
                            for (images_1 = __values(images), images_1_1 = images_1.next(); !images_1_1.done; images_1_1 = images_1.next()) {
                                item = images_1_1.value;
                                imgPublicId = item.public_id;
                                cloudinaryImagesRemove(imgPublicId)
                                    .catch(function (error) { return console.log(error); });
                            } // remove Image cloudinary
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (images_1_1 && !images_1_1.done && (_b = images_1.return)) _b.call(images_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var prevProduct, updatedProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneId(req.params.id)];
                    case 1:
                        prevProduct = _a.sent();
                        return [4 /*yield*/, this.model.updateOne({ _id: req.params.id }, __assign(__assign({}, req.body), { quantity: prevProduct.quantity + req.body.quantity }))];
                    case 2:
                        updatedProduct = _a.sent();
                        return [2 /*return*/, updatedProduct];
                }
            });
        });
    };
    return ProductService;
}());
export var productService = new ProductService({ model: productModel });

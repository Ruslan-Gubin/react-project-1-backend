import * as express from 'express';
import { checkAuth } from "./index.js";
import multer from 'multer';
import fs from 'fs';
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (_, __, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: function (_, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
var createUpload = function (req, res) {
    var _a;
    res.json({ url: "/uploads/".concat((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname), });
};
router.post('/api/uploads', checkAuth, upload.single('image'), createUpload);
export var uploadRouter = router;

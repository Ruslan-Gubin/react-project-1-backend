import { checkAuth } from "./index.js";
import Router from 'express';
import multer from 'multer';
import fs from 'fs';
var router = new Router();
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
    res.json({ url: "/uploads/".concat(req.file.originalname), });
};
router.post('/api/uploads', checkAuth, upload.single('image'), createUpload);
export var uploadRouter = router;

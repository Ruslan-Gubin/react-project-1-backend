import { checkAuth } from "../service/checkAuth.js";
import Router from 'express';
import multer from 'multer';
const router = new Router()
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({storage})

const createUpload = (req, res) => {
  res.json({url: `/uploads/${req.file.originalname}`,});}
    
router.post('/api/upload', checkAuth, upload.single('image'), createUpload);

export default router;
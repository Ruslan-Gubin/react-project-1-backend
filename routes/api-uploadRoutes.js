import { checkAuth } from "../utils/index.js";
import Router from 'express';
import multer from 'multer';
import fs from 'fs';

const router = new Router()

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
  res.json({url: `/api/uploads/${req.file.originalname}`,});}
    
router.post('/api/uploads', checkAuth, upload.single('image'), createUpload);

export const uploadRouter = router;
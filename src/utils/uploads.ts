import * as express from 'express';
import { checkAuth } from "./index.js";
import multer from 'multer';
import fs from 'fs';

const router: express.Router =  express.Router();

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

const createUpload = (req: express.Request, res: express.Response) => {
   res.json({url: `/uploads/${req.file?.originalname}`,});}
   router.post('/api/uploads', checkAuth, upload.single('image'), createUpload);
  

export const uploadRouter = router; 
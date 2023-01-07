import * as express from 'express';
import { adventureGameConroller } from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";
const router = express.Router();
router.patch('/api/adventure-active', checkAuth, adventureGameConroller.adventureActive);
export const adventureGameRouter = router;

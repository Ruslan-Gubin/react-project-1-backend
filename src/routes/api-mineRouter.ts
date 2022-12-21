import * as express from 'express';
import { mineGameConroller }  from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";

const router: express.Router =  express.Router();

router.patch('/api/mine-update-level', checkAuth, mineGameConroller.updateLevelMine)
router.patch('/api/mine-update-full', checkAuth, mineGameConroller.updateMinesFull)



export const mineGameRouter = router;
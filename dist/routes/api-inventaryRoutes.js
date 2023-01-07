import * as express from 'express';
import { inventoryGameConroller } from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";
const router = express.Router();
router.patch('/api/inventary-order-update', checkAuth, inventoryGameConroller.setInventoryOrder);
export const inventoryGameRouter = router;

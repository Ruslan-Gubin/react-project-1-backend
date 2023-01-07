import * as express from 'express';
import { inventoryGameConroller } from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";
const router = express.Router();
router.patch('/api/inventory-order-update', checkAuth, inventoryGameConroller.setInventoryOrder);
router.patch('/api/inventory-active', checkAuth, inventoryGameConroller.inventoryActive);
export const inventoryGameRouter = router;

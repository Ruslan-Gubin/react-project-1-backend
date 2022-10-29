import Router from "express";
import { productController } from "../controllers/index.js";

const router = new Router();

router.get("/api/products", productController.getProducts);
router.get("/api/products/:id", productController.getOneProduct);
router.post("/api/products", productController.addProduct);
router.put("/api/products", productController.editProduct);
router.delete("/api/products/:id", productController.deleteProduct);

export const productRouter = router;

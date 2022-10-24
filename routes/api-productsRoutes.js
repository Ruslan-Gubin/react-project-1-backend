import Router from 'express';
import ProductController from '../controllers/api-products-controlers.js';

const router = new Router()

router.get("/api/products", ProductController.getProducts);
router.get("/api/products/:id", ProductController.getOneProduct);
router.post("/api/products", ProductController.addProduct);
router.put("/api/products", ProductController.editProduct);
router.delete("/api/products/:id", ProductController.deleteProduct);

export default router;

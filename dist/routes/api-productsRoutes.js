import Router from "express";
import { productController } from "../controllers/index.js";
var router = new Router();
router
    .route("/api/products")
    .get(productController.getProducts);
router
    .route("/api/products/:id")
    .get(productController.getOneProduct)
    .patch(productController.editProduct);
router.get('/api/products-category', productController.getCatigoriesInDepartment);
router.post('/api/product-add', productController.addProduct);
router.delete('/api/product-remove', productController.removeProduct);
export var productRouter = router;

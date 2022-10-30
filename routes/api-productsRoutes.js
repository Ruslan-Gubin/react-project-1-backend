import Router from "express";
import { productController } from "../controllers/index.js";

const router = new Router();

router
  .route("/api/products")
  .get(productController.getProducts)
  .post(productController.addProduct)
  
  router
  .route("/api/products/:id")
  .get(productController.getOneProduct)
  .patch(productController.editProduct)
  .delete(productController.deleteProduct);

export const productRouter = router;

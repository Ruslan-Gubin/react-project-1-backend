import { productController } from "../controllers/index.js";
import { handleValidationErrors } from "../utils/index.js";
import { productValedation } from "../validations/index.js";
import * as express from 'express';

const router: express.Router =  express.Router();

router
  .route("/api/products")
  .get(productController.getProducts)
  
  router
  .route("/api/products/:id")
  .get(productController.getOneProduct)
  
  router.get('/api/products-category', productController.getCatigoriesInDepartment)
  router.post('/api/product-add', productValedation, handleValidationErrors, productController.addProduct) 
  router.delete('/api/product-remove', productController.removeProduct) 
  router.patch('/api/product-update', productController.editProduct) 

export const productRouter = router;

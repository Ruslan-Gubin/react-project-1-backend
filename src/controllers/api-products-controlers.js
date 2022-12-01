import { productService } from "../service/index.js";
import { handleError } from "../utils/index.js";

class ProductController {

  async getProducts(req, res) {
       await productService.getAllSortProducts(req)
      .then(products => res.status(200).json(products))
      .catch((error) => handleError(res, error.message, "Не удалось получить все товары"))
  }

  async getOneProduct(req, res) {
       await productService.getOneId(req)
      .then((product) => res.status(200).json(product))
      .catch((error) => handleError(res, error.message, "Не удалось получить продукт"))
  }

  async getCatigoriesInDepartment(req, res) {
    await productService.getCatigoriesInDepartment(req)
    .then((categories) => res.status(200).json(categories))
    .catch((error) => handleError(res, error.message, "Не удалось получить категории"));
  }

  async removeProduct(req, res) {
      await productService.removeProduct(req)
      .then(() => res.status(200).json({success: true, remove: req.body._id}))
      .catch((error) => handleError(res, error.message, "Не удалось удалить продукт"))
  }

  async editProduct(req, res) {
     await productService.update(req)
     .then(() => res.status(200).json({succses: true}))
     .catch((error) =>handleError(res, error, "Не удалось изменить продукт"));  
  }

  async addProduct(req, res) {
    await productService.addProduct(req)
    .then((product) => res.status(201).send({succses: true, data: product}))
    .catch((error) =>handleError(res, error, "Не удалось создать продукт"));
   
  }

}

export const productController = new ProductController()


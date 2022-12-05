import {  Response } from "express";
import { productService } from "../service/index.js";
import * as types from "../types/index.js";
import { handleError } from "../utils/index.js";


class ProductController {
 
  async getProducts(req: types.IRequestQuery<types.GetAllProductModelQuery>, res: Response<{data: types.IProduct[],length: number}>) {
    await productService
    .getAllSortProducts(req)
    .then((products) => res.status(200).json(products)) 
    .catch((error) =>
    handleError(res, error.message, "Не удалось получить все товары")
    );
  }
  
  async getOneProduct(req: types.IRequestParams<{id: string}>, res: Response<types.IProduct | null>) {
    const id = req.params.id
    await productService
    .getOneId(id)
    .then((product) => res.status(200).json(product))
    .catch((error) =>
    handleError(res, error.message, "Не удалось получить продукт")
    );
  }
  
  async getCatigoriesInDepartment(req: types.IRequestQuery<types.GetCatigoryesTypeParams>, res: Response<types.GetCatigoryesTypeRespons[]>) {
    const department = req.query.department; 
    await productService
    .getCatigoriesInDepartment(department)
    .then((categories) => res.status(200).json(categories))
      .catch((error) =>
        handleError(res, error.message, "Не удалось получить категории")
        );
      }

      async addProduct(req: types.IRequestBody<types.CreateProductModel>,res: Response<types.CreateProductModelRespons>) {
        const reqBody = req.body;
        await productService
          .addProduct(reqBody)
          .then(() => res.status(201).json({ success: true }))
          .catch((error) => handleError(res, error, "Не удалось создать продукт"));
      }
      
      async removeProduct(req: types.IRequestBody<types.RemoveProductModelBody>, res: Response<types.RemoveProductModelResponse>) {
        const body = req.body
        await productService 
        .removeProduct(body)  
        .then((removeRes) => res.status(200).json(removeRes))
        .catch((error) =>
        handleError(res, error.message, "Не удалось удалить продукт")
        );
      }
      
      async editProduct(req: types.IRequestBody<types.UpdateProductBody>, res: Response) {
        const body = req.body
        await productService
        .update(body)
        .then((newProduct) => res.status(200).json( newProduct ))
        .catch((error) => handleError(res, error, "Не удалось изменить продукт"));
      }
    }
    
    export const productController = new ProductController();

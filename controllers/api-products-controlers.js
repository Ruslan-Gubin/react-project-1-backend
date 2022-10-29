import { productService } from "../service/index.js";

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await productService.getAll();
      return res.json(products);
    } catch (error) {
      res.status(500).json(error, "Не удалось получить все товары");
    }
  }

  async getOneProduct(req, res) {
    try {
      const product = await productService.getProduct(req.params.id);
      return res.json(product);
    } catch (error) {
      res.status(500).json(error, "Не удалось получить товар");
    }
  }

  async deleteProduct(req, res) {
    try {
      await productService.remove(req.params.id);
      return res.status(200).json(req.params.id);
    } catch (error) {
      res.status(500).json(error, "Не удалось удалить товар");
    }
  }

  async editProduct(req, res) {
    try {
      const updatedProduct = await productService.update(req.body);
      return res.json(updatedProduct);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async addProduct(req, res) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error, "Не удалось добавить товар");
    }
  }
}

export const productController = new ProductController()


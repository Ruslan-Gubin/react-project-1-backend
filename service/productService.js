import {productModel} from "../models/index.js";

class ProductService {
  async create(product) {
    const createdProduct = await (await productModel.create(product)).save();
    return createdProduct;
  }

  async getAll() {
    const product = await productModel.find().sort({ createdAt: -1 });
    return product;
  }

  async getProduct(id) {
    const product = await productModel.findById(id);
    return product;
  }

  async remove(id) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const product = await productModel.findByIdAndDelete(id);
    return product;
  }

  async update(product) {
    if (!product._id) {
      throw new Error("не указан ID");
    }
    const updatedProduct = await Post.findByIdAndUpdate(product._id, product, {
      new: true,
    });
    return updatedProduct;
  }
  
}

export const productService = new ProductService()

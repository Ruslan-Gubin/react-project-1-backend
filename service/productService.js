import {productModel} from "../models/index.js";

class ProductService {
  constructor(options) {
    this.model = options.model;
  }

  async getOneId(id) {
  return  await this.model.findById(id)
  }

  async create(product) {
    const createdProduct = await (await this.model.create(product)).save();
    return createdProduct;
  }

  async getAll() {
    const product = await this.model.find().sort({ createdAt: -1 });
    return product;
  }

  async getProduct(id) {
    const product = await this.model.findById(id);
    return product;
  }

  async remove(id) {
    if (!id) {
      throw new Error("не указан ID"); 
    }
    const product = await this.model.findByIdAndDelete(id);
    return product;
  }

  async update(req) {
    const prevProduct = await this.getOneId(req.params.id)
    
    const updatedProduct = await this.model.updateOne(
      {_id: req.params.id},
      {...req.body,
        quantity: prevProduct.quantity + req.body.quantity,
      },
    )
    return updatedProduct;
  }
  
}

export const productService = new ProductService({model:productModel})

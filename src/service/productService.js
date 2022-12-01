import { productModel } from "../models/index.js";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../utils/cloudinaryImagesMethod.js";

import { commentService } from "./commentService.js";

class ProductService {
  constructor(options) {
    this.model = options.model;
  }

  async getAllSortProducts(req) {
    const department = req.query.department;
    const searchTitle = req.query.textSearch ? req.query.textSearch : "";
    const category = req.query.category !== "Все" ? req.query.category : "";
    const select = req.query.select;

    const optionSelect = {
      updateDate: { createdAt: -1 },
      minPrice: { price: 1 },
      maxPrice: { price: -1 },
      discounts: { discount: 1 },
    };

    const perPage = req.query.perPage;
    const page = req.query.page;
    const skips = (page - 1) * perPage;

    const totalLength = await this.model.find({
      $and: [
        { department: department },
        { title: { $regex: `${searchTitle}`, $options: "i" } },
        { category: { $regex: `${category}` } },
      ],
    });
    const length = totalLength.length;

    const products = await this.model
      .find({
        $and: [
          { department: department },
          { title: { $regex: `${searchTitle}`, $options: "i" } },
          { category: { $regex: `${category}` } },
        ],
      })
      .sort(optionSelect[select])
      .skip(skips)
      .limit(perPage);

    return { data: products, length };
  }

  async getOneId(req) {
    const id = req.params.id;
    if (!id) {
      throw new Error("Не найден Id продукта");
    }
    const veiwsUpdate = await this.model.findOneAndUpdate(
      {_id: id},
    { $inc:  {viewsCount: 1} },
    {returnDocument: 'after' }
    )

return veiwsUpdate
  }

  async getCatigoriesInDepartment(req) {
    const department = req.query.department;
    if (!department) {
      throw new Error("Department не указан");
    }

    const departmentArr = await this.model.find(
      { department: department },
      { _id: false, category: 1 }
      );
      const filterArrSet = [];
      
    departmentArr.forEach((item) => {
      const copyFilterArrSet = filterArrSet;
      if (!copyFilterArrSet.includes(item.category)) {
        filterArrSet.push(item.category);
      }
    });

    const map = filterArrSet.map((item) => {
      return (item = { label: item, value: item });
    });
    
    const addAll = [{ label: "Все", value: "Все" }, ...map];
    
    return addAll;
  }

  async addProduct(req) {
    const { department, title, description, price, oldPrice, quantity, newCategory, select,
      } = req.body;
     
    const category = newCategory ? newCategory : select.value;
    const discount = Math.ceil(((price - oldPrice) / oldPrice) * 100);

    const imageUrl = [];
    const files = req.body.images;
    for (const file of files) {
      const newImage = await cloudinaryImagesMethod(file, "Products");
      imageUrl.push(newImage);
    }

    const newProduct = await this.model.create({
      department,
      title,
      price,
      oldPrice,
      quantity,
      discount,
      description,
      category,
      images: imageUrl.map((item) => item),
    });

    return newProduct;
  }
  
  async removeProduct(req) {  
    const {_id, images, comments,} = req.body

    await this.model.findByIdAndDelete(_id)  // remove Product
    .catch(error => console.log(error)) 

  await commentService.removeCommentsForTarget(comments)
  .catch(error => console.log(error)) //remove comments Product

  for (const item of images) {
    const imgPublicId = item.public_id
    cloudinaryImagesRemove(imgPublicId)
    .catch(error => console.log(error))
  }                                  // remove Image cloudinary
  }
 
  async update(req) {
    const prevProduct = await this.getOneId(req.params.id);
    
    const updatedProduct = await this.model.updateOne(
      { _id: req.params.id },
      { ...req.body, quantity: prevProduct.quantity + req.body.quantity }
      );
      return updatedProduct;
  }
}

export const productService = new ProductService({ model: productModel });

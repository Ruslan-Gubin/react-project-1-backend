import { Model } from "mongoose";
import { productModel } from "../models/index.js";
import { cloudinaryImagesMethod, cloudinaryImagesRemove } from "../utils/cloudinaryImagesMethod.js";
import { commentService } from "./commentService.js";
import * as types from '../types/productTypes/index.js';
import { IRequestQuery } from "../types/IRequest.js";


export class ProductService {      
  
  constructor(private readonly model: Model<types.IProduct>) {}

  async addProduct(req: types.CreateProductModel): Promise<types.IProduct | {success: string}> { 
    if (!req.images) {
      throw new Error("No images")  
    }
  
    const { department, title, description, price, oldPrice, quantity, newCategory, select,
    } = req;
    
    let category = newCategory ? newCategory : select.value;
    if (!category) { 
      return {success: 'no category'}
    }
    const discount = oldPrice && Math.ceil(((price - oldPrice) / oldPrice) * 100);
  
    const imageUrl = [];
    const files = req.images; 
    for (const file of files) {
      const newImage = await cloudinaryImagesMethod(file, "Products"); 
      imageUrl.push(newImage);
    }
    
    const newProduct = await this.model.create({   
      department,
      title,
      price,
      oldPrice: oldPrice ? oldPrice : '',
      quantity: quantity ? quantity : 0,
      discount: oldPrice ? discount : false,
      description,
      category, 
      images: imageUrl.map((item) => item),
    });
  
    return newProduct && newProduct;
  }
  
  async getAllSortProducts(req: IRequestQuery<types.GetAllProductModelQuery>): Promise<{data: types.IProduct[],length: number}> { 
    const department = req.query.department;
    const searchTitle = req.query.textSearch ? req.query.textSearch : "";
    const category = req.query.category !== "Все" ? req.query.category : "";
    const select = req.query.select;

    const optionSelect: any = {
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
        { department },
        { title: { $regex: `${searchTitle}`, $options: "i" } },
        { category: { $regex: `${category}` } },
      ],
    });
    const length: number = totalLength.length;

    const products: types.IProduct[] = await this.model
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

  async getOneId(id: string): Promise<types.IProduct | null> {
    if (!id) {
      throw new Error("Не найден Id продукта");
    }
    const veiwsUpdate = await this.model.findOneAndUpdate(
      {_id: id},
    { $inc:  {viewsCount: 1} },
    {returnDocument: 'after' }
    )
    return  veiwsUpdate
  }

  async getCatigoriesInDepartment(department: string): Promise<types.GetCatigoryesTypeRespons[]> {
    if (!department) {
      throw new Error("Department не найден");
    }

    const departmentArr = await this.model.find(
      { department: department },
      { _id: false, category: 1 }
      );

      const filterArrSet: any = []; 
      
    departmentArr.forEach((item) => {
      if (!filterArrSet.includes(item.category)) {
        filterArrSet.push(item.category);
      }
    });

    const map: {label: string, value: string }[] = filterArrSet.map((item:unknown) => {
      return (item = { label: item, value: item });
    });
    
    const addAll = [{ label: "Все", value: "Все" }, ...map];
    
    return addAll;
  }

  async removeProduct(body: types.RemoveProductModelBody): Promise<types.RemoveProductModelResponse> { 
    
    const {_id, images, comments,} = body

    await this.model.findByIdAndDelete(_id)  // remove Product
    .catch(error => console.log(error)) 

  await commentService.removeCommentsForTarget(comments)
  .catch(error => console.log(error)) //remove comments Product

  for (const item of images) {
    const imgPublicId = item.public_id
    cloudinaryImagesRemove(imgPublicId)
    .catch(error => console.log(error))
  }                                  // remove Image cloudinary
  return {success: true, remove: _id}
  }
 
  async update(body: types.UpdateProductBody)  { 
    if (!body) {
      throw new Error('Не получено тело запроса')
    }

    const {id, description, discount, newQantity, oldPrice, price, title, select, newCategory,
      remainsImages, imageAddUpdate, imageRemovesUpdate
    } = body
    const category = newCategory ? newCategory : select.value

    const newImagesUrl = []
    for (let file of imageAddUpdate) {
      const newImage = await cloudinaryImagesMethod(file, "Products");
      newImagesUrl.push(newImage)
    }
    const images = [...remainsImages, ...newImagesUrl]

    for (const item of imageRemovesUpdate) {
    await  cloudinaryImagesRemove(item)
      .catch(error => console.log(error))
    } 
   
    const updatedProduct = await this.model.updateOne(
      { _id: id },
      { images, title, description,discount,quantity: newQantity, oldPrice, price,category }
      );
    return  updatedProduct;
  }

}

const productService = new ProductService(productModel);

export {productService}
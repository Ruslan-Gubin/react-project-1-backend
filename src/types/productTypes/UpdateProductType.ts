import { IProduct } from "./IProduct.js";

interface UpdateProductBody extends IProduct {
  id: string;
  newQantity: number;
  imageRemovesUpdate: string[];
  imageAddUpdate: string[];
  remainsImages: { _id: string; public_id: string; url: string }[];
  select: { label: string; value: string };
  newCategory: string;
}

export type { UpdateProductBody };

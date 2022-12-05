import { IProduct } from "./IProduct.js";

interface RemoveProductModelBody extends IProduct {}

interface RemoveProductModelResponse {
  success: boolean;
  remove: string;
}

export type { RemoveProductModelBody, RemoveProductModelResponse };

import { IProduct } from "./IProduct.js";

type RemoveProductModelBody = IProduct

interface RemoveProductModelResponse {
  success: boolean;
  remove: string;
}

export type { RemoveProductModelBody, RemoveProductModelResponse };

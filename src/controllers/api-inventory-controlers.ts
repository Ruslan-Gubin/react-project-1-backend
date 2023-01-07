import { Response, Request } from 'express';
import { handleError } from '../utils/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import { inventoryService } from '../service/index.js';
import * as types from '../types/GameType/index.js';


class InventoryGameConroller { 

  async setInventoryOrder(req: IRequestBody<{inventoryUpdate: types.InventoryType[], playerId: string, resourceBar: types.ResourceBarType}>, res: Response<{success: boolean}>) {  
    const body = req.body
    await inventoryService.setInventoryOrder(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось изменить инвентарь'));
  }

  async inventoryActive(req: IRequestBody<{inventoryUpdate: types.InventoryType[] , playerId: string, resourceBar: types.ResourceBarType}>, res: Response<{success: boolean}>) {  
    const body = req.body
    await inventoryService.inventoryActive(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось изменить инвентарь'));
  }


}

export const inventoryGameConroller = new InventoryGameConroller();
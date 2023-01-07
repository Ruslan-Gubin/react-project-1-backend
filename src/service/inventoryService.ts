import { Model } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';

class InventoryService {
  constructor(private readonly model: Model<types.playerType>) {}

  async setInventoryOrder(body: {inventoryUpdate: types.InventoryType[], playerId: string , resourceBar: types.ResourceBarType}): Promise<{success: boolean}> {
   const {inventoryUpdate, playerId} = body
    
   await this.model.findOneAndUpdate({_id: playerId}, {inventory: inventoryUpdate.sort((a,b) => a.order - b.order), resourceBar: body.resourceBar})

    return {success: true}
  }

  async inventoryActive(body: {inventoryUpdate: types.InventoryType[], playerId: string , resourceBar: types.ResourceBarType}): Promise<{success: boolean}> {
    const { inventoryUpdate , playerId} = body
   if (!inventoryUpdate && !playerId) {
    throw new Error('Ошибка при получении данных')
   }

    await this.model.findOneAndUpdate({_id: playerId}, {inventory: inventoryUpdate, resourceBar: body.resourceBar })
     return {success: true}
  }
}

export const inventoryService = new InventoryService(playerModel)
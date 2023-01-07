import { playerModel } from '../models/index.js';
class InventoryService {
    constructor(model) {
        this.model = model;
    }
    async setInventoryOrder(body) {
        const { inventoryUpdate, playerId } = body;
        await this.model.findOneAndUpdate({ _id: playerId }, { inventory: inventoryUpdate.sort((a, b) => a.order - b.order), resourceBar: body.resourceBar });
        return { success: true };
    }
    async inventoryActive(body) {
        const { inventoryUpdate, playerId } = body;
        if (!inventoryUpdate && !playerId) {
            throw new Error('Ошибка при получении данных');
        }
        await this.model.findOneAndUpdate({ _id: playerId }, { inventory: inventoryUpdate, resourceBar: body.resourceBar });
        return { success: true };
    }
}
export const inventoryService = new InventoryService(playerModel);

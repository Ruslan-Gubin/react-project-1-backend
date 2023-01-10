import { playerModel } from '../models/index.js';
import { resourceBarUpdate } from '../utils/resourceBarUpdate.js';
import { adventuresService } from './adventuresService.js';
class InventoryService {
    constructor(model) {
        this.model = model;
    }
    async setInventoryOrder(body) {
        const { inventoryUpdate, playerId } = body;
        const prevResourceBar = await adventuresService.prevResourceBar(playerId);
        const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);
        await this.model.findOneAndUpdate({ _id: playerId }, { inventory: inventoryUpdate.sort((a, b) => a.order - b.order), resourceBar });
        return { success: true };
    }
    async inventoryActive(body) {
        const { inventoryUpdate, playerId } = body;
        if (!inventoryUpdate && !playerId) {
            throw new Error('Ошибка при получении данных');
        }
        const prevResourceBar = await adventuresService.prevResourceBar(playerId);
        const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);
        await this.model.findOneAndUpdate({ _id: playerId }, { inventory: inventoryUpdate, resourceBar });
        return { success: true };
    }
}
export const inventoryService = new InventoryService(playerModel);

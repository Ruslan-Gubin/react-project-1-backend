import { handleError } from '../utils/index.js';
import { inventoryService } from '../service/index.js';
const check = (req) => {
    console.log('body', req.body);
    console.log('params', req.params);
    console.log('query', req.query);
};
class InventoryGameConroller {
    async setInventoryOrder(req, res) {
        const body = req.body;
        await inventoryService.setInventoryOrder(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось изменить инвентарь'));
    }
    async inventoryActive(req, res) {
        const body = req.body;
        await inventoryService.inventoryActive(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось изменить инвентарь'));
    }
}
export const inventoryGameConroller = new InventoryGameConroller();

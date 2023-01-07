import { playerModel } from '../models/index.js';
class InventaryService {
    constructor(model) {
        this.model = model;
    }
    async setInventaryOrder(body) {
        console.log(body);
    }
}
export const inventaryService = new InventaryService(playerModel);

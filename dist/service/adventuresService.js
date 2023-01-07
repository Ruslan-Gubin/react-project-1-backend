import { playerModel } from '../models/index.js';
class AdventuresService {
    constructor(model) {
        this.model = model;
    }
    async adventureActive(body) {
        console.log(body);
        return { success: true };
    }
}
export const adventuresService = new AdventuresService(playerModel);

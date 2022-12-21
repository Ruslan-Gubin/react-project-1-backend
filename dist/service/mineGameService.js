import { playerModel } from '../models/index.js';
const timeout = (callback, delay) => {
    const tick = () => callback();
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
};
class MineGameService {
    constructor(model) {
        this.model = model;
    }
    async updateLevelMine(body) {
        const { level, idMine, income, incrementIncome, piple, playerId, population, resurce, time, resurceBar, resurceBarAfterUpdate } = body;
        return await this.model.findByIdAndUpdate(playerId, { resourceBar: resurceBar }, { returnDocument: 'after' });
    }
    async updateMinesFull(body) {
        return await this.model.findByIdAndUpdate('639f6e0f96a0460f0a04372a', { resourceBar: { iron: 750, wheat: 750, wood: 750, clay: 750 } }, { returnDocument: 'after' });
    }
}
export const mineGameService = new MineGameService(playerModel);

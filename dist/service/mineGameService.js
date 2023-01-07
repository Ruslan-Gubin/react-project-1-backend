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
        const { level, idMine, income, incomeUpdate, piple, playerId, population, time, resourceBar, resourceBarAfterUpdate } = body;
        await this.model.findByIdAndUpdate(playerId, { resourceBar: resourceBar }, { returnDocument: 'after' });
        const updateMineFn = async () => {
            try {
                const minesUpdate = await this.model.findOne({ _id: playerId }, { mines: true, _id: false });
                if (minesUpdate) {
                    minesUpdate === null || minesUpdate === void 0 ? void 0 : minesUpdate.mines.map(item => {
                        if (item._id == idMine) {
                            item.level = level;
                            item.income = income;
                            item.piple = piple;
                        }
                    });
                }
                const playerUpdate = await this.model.findByIdAndUpdate(playerId, { $inc: { population: population }, income: incomeUpdate, resourceBar: resourceBarAfterUpdate, mines: minesUpdate === null || minesUpdate === void 0 ? void 0 : minesUpdate.mines }, { returnDocument: 'after' });
                return playerUpdate;
            }
            catch (error) {
                console.log(error);
            }
        };
        return timeout(() => updateMineFn(), (time));
    }
    async updateMinesFull(body) {
        return await this.model.findByIdAndUpdate('63a4bd0b0901de8faaeef509', { resourceBar: { iron: 750, wheat: 750, wood: 750, clay: 750 } }, { returnDocument: 'after' });
    }
}
export const mineGameService = new MineGameService(playerModel);

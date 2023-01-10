import { playerModel } from '../models/index.js';
import { resourceBarUpdate } from '../utils/resourceBarUpdate.js';
import { timeout } from '../utils/timeoutHelpers.js';
class MineGameService {
    constructor(model) {
        this.model = model;
    }
    async updateLevelMine(body) {
        const { level, idMine, income, incomeUpdate, piple, playerId, population, time, resourceBar } = body;
        await this.model.findByIdAndUpdate(playerId, { resourceBar }, { returnDocument: 'after' });
        const updateMineFn = async () => {
            try {
                const minesUpdate = await this.model.findOne({ _id: playerId }, { resourceBar: true, capasity: true, income: true, updatedAt: true, mines: true, _id: false });
                if (minesUpdate) {
                    minesUpdate === null || minesUpdate === void 0 ? void 0 : minesUpdate.mines.map(item => {
                        if (item._id == idMine) {
                            item.level = level;
                            item.income = income;
                            item.piple = piple;
                        }
                    });
                }
                if (!minesUpdate) {
                    throw new Error('Не найдены предыдущие данные');
                }
                const resourceBar = resourceBarUpdate.resourceBarUpdate(minesUpdate);
                const playerUpdate = await this.model.findByIdAndUpdate(playerId, { $inc: { population: population }, income: incomeUpdate, resourceBar, mines: minesUpdate === null || minesUpdate === void 0 ? void 0 : minesUpdate.mines }, { returnDocument: 'after' });
                return playerUpdate;
            }
            catch (error) {
                console.log(error);
            }
        };
        return timeout(() => updateMineFn(), (time));
    }
    async updateMinesFull(body) {
        return await this.model.findByIdAndUpdate('63b9ab403f6fde7fa76f8de5', { resourceBar: { iron: 750, wheat: 750, wood: 750, clay: 750 } }, { returnDocument: 'after' });
    }
}
export const mineGameService = new MineGameService(playerModel);

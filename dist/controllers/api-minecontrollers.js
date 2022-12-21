import { handleError } from '../utils/index.js';
import { mineGameService } from '../service/index.js';
const check = (req) => {
    console.log('body', req.body);
    console.log('params', req.params);
    console.log('query', req.query);
};
class MineGameConroller {
    async updateLevelMine(req, res) {
        const body = req.body;
        await mineGameService.updateLevelMine(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось улучшить шахту'));
    }
    async updateMinesFull(req, res) {
        const body = req.body;
        await mineGameService.updateMinesFull(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось улучшить шахту'));
    }
}
export const mineGameConroller = new MineGameConroller();

import { handleError } from '../utils/index.js';
import { playerService } from '../service/playerService.js';
const check = (req) => {
    console.log('body', req.body);
    console.log('params', req.params);
    console.log('query', req.query);
};
class PlayerConroller {
    async createPlayer(req, res) {
        const body = req.body;
        await playerService.createPlayer(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось создать игрока'));
    }
    async getOnePlayer(req, res) {
        const query = req.query;
        await playerService.getOnePlayer(query)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Игрок не найден'));
    }
    async removePlayer(req, res) {
        const { userId } = req.query;
        await playerService.removePlayer(userId)
            .then(() => res.status(201).json({ success: true }))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить игрока'));
    }
    async updatePlayer(req, res) {
        const body = req.body;
        await playerService.updatePlayer(body)
            .then((updatePlayer) => res.status(201).json(updatePlayer))
            .catch((error) => handleError(res, error.message, 'Не удалось удалить игрока'));
    }
}
export const playerController = new PlayerConroller();

import { handleError } from '../utils/index.js';
import { adventuresService } from '../service/index.js';
const check = (req) => {
    console.log('body', req.body);
    console.log('params', req.params);
    console.log('query', req.query);
};
class AdventureGameConroller {
    async adventureActive(req, res) {
        check(req);
        const body = req.body;
        await adventuresService.adventureActive(body)
            .then((data) => res.status(201).json(data))
            .catch((error) => handleError(res, error.message, 'Не удалось изменить инвентарь'));
    }
}
export const adventureGameConroller = new AdventureGameConroller();

import * as express from 'express';
import { playerController } from "../controllers/index.js";
import { checkAuth } from "../utils/index.js";
const router = express.Router();
router.post('/api/player-create', checkAuth, playerController.createPlayer);
router.get('/api/player-get', checkAuth, playerController.getOnePlayer);
router.delete('/api/player-remove', checkAuth, playerController.removePlayer);
router.patch('/api/player-update', checkAuth, playerController.updatePlayer);
export const playerRouter = router;

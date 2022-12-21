import { Response, Request } from 'express';
import { handleError } from '../utils/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import { playerService } from '../service/playerService.js';
import * as types from '../types/GameType/index.js';

const check = (req: Request) => {
  console.log('body', req.body)
  console.log('params', req.params)
  console.log('query', req.query)
}

class PlayerConroller {

  async createPlayer(req: IRequestBody<types.createPlayerBody>, res: Response<types.playerType>) {
    const body = req.body
    await playerService.createPlayer(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось создать игрока'));
  }

  async getOnePlayer(req: IRequestQuery<{id: string}>, res: Response<types.playerType>) {
    const query = req.query
    await playerService.getOnePlayer(query)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Игрок не найден'));
  }

  async removePlayer(req: IRequestQuery<{userId: string}>, res: Response<{success: boolean}>) {
    const {userId} = req.query
    await playerService.removePlayer(userId)
    .then(() => res.status(201).json({success: true}))
    .catch((error) => handleError(res, error.message, 'Не удалось удалить игрока'));
  }

  async updatePlayer(req: IRequestBody<{text: string, userId: string}>, res: Response<types.playerType>) {
    const body = req.body
    await playerService.updatePlayer(body)
    .then((updatePlayer) => res.status(201).json(updatePlayer))
    .catch((error) => handleError(res, error.message, 'Не удалось удалить игрока'));
  }

}

export const playerController = new PlayerConroller();
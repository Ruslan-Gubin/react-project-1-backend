import { Response, Request } from 'express';
import { handleError } from '../utils/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import { mineGameService } from '../service/index.js';
import * as types from '../types/GameType/index.js';


const check = (req: Request) => {
  console.log('body', req.body) 
  console.log('params', req.params)
  console.log('query', req.query)
}

class MineGameConroller {

  async updateLevelMine(req: IRequestBody<types.MineUpdateLevelBody>, res: Response<(value: types.playerType) => void>) {
    const body = req.body
    await mineGameService.updateLevelMine(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось улучшить шахту'));
  }

  async updateMinesFull(req: IRequestBody<types.MineUpdateLevelBody>, res: Response<{success: boolean}>) {
    const body = req.body
    await mineGameService.updateMinesFull(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось улучшить шахту'));
  }

  

}

export const mineGameConroller = new MineGameConroller();
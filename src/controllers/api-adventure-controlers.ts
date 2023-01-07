import { Response, Request } from 'express';
import { handleError } from '../utils/index.js';
import { IRequestBody, IRequestParams, IRequestQuery } from '../types/IRequestRespons/index.js';
import { adventuresService } from '../service/index.js';
import * as types from '../types/GameType/index.js';


const check = (req: Request) => {
  console.log('body', req.body) 
  console.log('params', req.params)
  console.log('query', req.query)
}

class AdventureGameConroller { 

  async adventureActive(req: IRequestBody<{compasCost: number, timeMs: number, resourceBar: types.ResourceBarType}>, res: Response<{success: boolean}>) {  
    const body = req.body
    await adventuresService.adventureActive(body)
    .then((data) => res.status(201).json(data))
    .catch((error) => handleError(res, error.message, 'Не удалось отправится в приключение'));
  }

}

export const adventureGameConroller = new AdventureGameConroller();
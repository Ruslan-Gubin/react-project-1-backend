import { Model } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';

class AdventuresService {
  constructor(private readonly model: Model<types.playerType>) {}

  async adventureActive(body: {compasCost: number, timeMs: number, resourceBar: types.ResourceBarType}): Promise<{success: boolean}> {
   console.log(body) 
    
   

    return {success: true}
  }

 
}

export const adventuresService = new AdventuresService(playerModel)
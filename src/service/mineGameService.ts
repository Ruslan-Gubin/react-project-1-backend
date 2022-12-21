import { Model, UpdateWriteOpResult } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';

const timeout = (callback: () => void, delay:number) => {
  const tick = () => callback()
   const timer =   setTimeout( tick, delay)
  return () => clearTimeout(timer)
}

class MineGameService {
  constructor(private readonly model: Model<types.playerType>) {}

  async updateLevelMine(body: types.MineUpdateLevelBody): Promise<any> {
    const {level, idMine, income, incrementIncome, piple, playerId, population, resurce, time, resurceBar, resurceBarAfterUpdate} = body
    // console.log(resurceBar)
    // console.log('-----------------------------') 
    // console.log(resurceBarAfterUpdate)

    return await this.model.findByIdAndUpdate(playerId,
     {resourceBar: resurceBar},
     {returnDocument: 'after'}
     )
     
  //  const updateMineFn = async () => {
  //   }
    
  // return  timeout(() => updateMineFn(),(time)) 
    
  }

  async updateMinesFull(body: types.MineUpdateLevelBody): Promise<any> {
    return await this.model.findByIdAndUpdate('639f6e0f96a0460f0a04372a',
     {resourceBar: {iron: 750,wheat: 750, wood: 750, clay: 750}},
     {returnDocument: 'after'}
     )
  }


}

export const mineGameService = new MineGameService(playerModel);
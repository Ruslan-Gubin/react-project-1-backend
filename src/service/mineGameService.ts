import mongoose, { Model, UpdateWriteOpResult } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';

const timeout = (callback: () => void, delay:number) => {
  const tick = () => callback()
   const timer =   setTimeout( tick, delay)
  return () => clearTimeout(timer)
}

class MineGameService {
  constructor(private readonly model: Model<types.playerType>) {}

  async updateLevelMine(body: types.MineUpdateLevelBody): Promise<(value: types.playerType) => void> { 
    const {level, idMine, income,  incomeUpdate, piple, playerId, population,  time, resurceBar, resurceBarAfterUpdate} = body

    await this.model.findByIdAndUpdate(playerId,
      {resourceBar: resurceBar},
      {returnDocument: 'after'}
      )
     
    const updateMineFn = async () => { 
      try {
      const minesUpdate = await this.model.findOne({_id: playerId}, {mines: true, _id: false})
      if (minesUpdate) {
        minesUpdate?.mines.map(item => {
          if (item._id == idMine) {
            item.level = level
            item.income = income
            item.piple = piple
          }
        })
      }
    
      const playerUpdate = await this.model.findByIdAndUpdate(playerId, 
        {$inc: {population:  population}, income: incomeUpdate, resourceBar: resurceBarAfterUpdate, mines: minesUpdate?.mines},
        {returnDocument: 'after'}
        )
       
        return playerUpdate
      
    } catch (error) {
      console.log(error)
    }
    }
    
  return  timeout(() => updateMineFn(),(time))  
  }



  async updateMinesFull(body: types.MineUpdateLevelBody): Promise<any> {
    return await this.model.findByIdAndUpdate('63a4bd0b0901de8faaeef509',
     {resourceBar: {iron: 750,wheat: 750, wood: 750, clay: 750}},
     {returnDocument: 'after'}
     )
  }


}

export const mineGameService = new MineGameService(playerModel);
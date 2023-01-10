import  { Model } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';
import { resourceBarUpdate } from '../utils/resourceBarUpdate.js';
import { timeout } from '../utils/timeoutHelpers.js';


class MineGameService {
  constructor(private readonly model: Model<types.playerType>) {}

  async updateLevelMine(body: types.MineUpdateLevelBody): Promise<(value: types.playerType) => void> { 
    const {level, idMine, income,  incomeUpdate, piple, playerId, population,  time, resourceBar} = body

    await this.model.findByIdAndUpdate(playerId,
      {resourceBar},
      {returnDocument: 'after'}
      )
     
    const updateMineFn = async () => { 
      try {
      const minesUpdate = await this.model.findOne({_id: playerId}, {resourceBar: true, capasity: true, income: true, updatedAt: true, mines: true, _id: false})
      if (minesUpdate) {
        minesUpdate?.mines.map(item => {
          if (item._id == idMine) {
            item.level = level
            item.income = income
            item.piple = piple
          }
        })
      }

      if (!minesUpdate) {
        throw new Error('Не найдены предыдущие данные')
      }
      const resourceBar = resourceBarUpdate.resourceBarUpdate(minesUpdate) 
    
      const playerUpdate = await this.model.findByIdAndUpdate(playerId, 
        {$inc: {population:  population}, income: incomeUpdate, resourceBar, mines: minesUpdate?.mines},
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
    return await this.model.findByIdAndUpdate('63b9ab403f6fde7fa76f8de5',
     {resourceBar: {iron: 750,wheat: 750, wood: 750, clay: 750}},
     {returnDocument: 'after'}
     )
  }


}

export const mineGameService = new MineGameService(playerModel);
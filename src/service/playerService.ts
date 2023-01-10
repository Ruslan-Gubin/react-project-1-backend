import { Model, UpdateWriteOpResult } from 'mongoose';
import { initialInventory } from '../data/initialInventory.js';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';
import { initialParamsOfPlayer } from '../utils/initialParamsOfPlayer.js';

class PlayerService {
  constructor(private readonly model: Model<types.playerType>) {}

  async createPlayer(body: types.createPlayerBody): Promise<types.playerType> {
    const {userId} = body
    const newName = new Date().getTime();
    const nameSity = body.nameSity ? body.nameSity : `new Sity${newName}`;

    const checkPlayer = await this.model.findOne({user: {_id: userId}})

    if (checkPlayer) {
      throw new Error('У пользователя уже есть игра')
    }

    const firstInventory = initialInventory

   return await this.model.create({
      user: userId,
      ...initialParamsOfPlayer,
      nameSity,
      inventory: firstInventory,
      adventure: {status: false, extraction: {wood:0, iron: 0, wheat: 0,clay: 0}},
    });
    
  }

  async getOnePlayer(query: { id: string }): Promise<types.playerType> {
    const { id } = query;

    if (!id) {
      throw new Error('Не получен ID игрока');
    }

    const player = await this.model.findOne({ user: {_id: id }}).populate('user');

    if (!player) {
      throw new Error('игрок не найден');
    }

    const { passwordHash, ...args } = player.user._doc;

    player.user = {
      ...args,
    };
    return player;
  }

  async removePlayer(userId:string ): Promise<{success: boolean}> {
    if (!userId) {
      throw new Error('Не получен ID игрока');
    }
    await this.model.findOneAndDelete({user: {_id: userId}})

    return  {success: true} 
}

  async updatePlayer(body: {text: string, userId: string} ): Promise<types.playerType> {
    const {text, userId} = body
    if (!body) {
      throw new Error('Не получен ID игрока');
    }

    const updatePlayer = await this.model.findOneAndUpdate({user: {_id: userId}}, {nameSity: text},{returnDocument: 'after'})

    if (!updatePlayer) {
      throw new Error('Не удалось изменить игрока')
    }

  return updatePlayer
}
}

export const playerService = new PlayerService(playerModel);

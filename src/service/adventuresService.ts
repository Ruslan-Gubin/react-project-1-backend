import { Model } from 'mongoose';
import { playerModel } from '../models/index.js';
import * as types from '../types/GameType/index.js';
import { levelCheckNextUp } from '../utils/playerLevelUpRules.js';
import { randomSumAdventure } from '../utils/randomSumAdventure.js';
import { resourceBarUpdate } from '../utils/resourceBarUpdate.js';
import { timeout } from '../utils/timeoutHelpers.js';

class AdventuresService {
  constructor(private readonly model: Model<types.playerType>) {}

  async adventureActive(body: types.AdventureActiveBodyType): Promise<(value: types.playerType) => void> {
    const { compassCost, timeMs, playerId } = body;

    /**получаем ресурсы с посл. обновления */
    const prevResourceBar = await this.prevResourceBar(playerId);
    /**вычисляем актуальное количество ресурсов */
    const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);

    const nowDate = Date.now();
    /**указываем время начальное конец путишествия и время когда вернется домой*/
    const timeAdventure = {
      startTime: nowDate,
      endTime: nowDate + timeMs,
      goBackTime: nowDate + timeMs * 2,
    };
    /**делаем первое обновление игрока с обновленым баром ресурсов и указываем время*/
    const player = await this.model.findByIdAndUpdate(playerId, {
      $inc: { compass: -compassCost },
      resourceBar,
      adventure: {
        status: true,
        extraction: { wood: 0, iron: 0, wheat: 0, clay: 0 },
        ...timeAdventure,
      },
    });

    if (!player) {
      throw new Error('Игрок не найден');
    }
    /**через время которое выбрал пользователь вызываем функцию */
    return timeout(() => this.endAdventures(playerId, timeMs, compassCost, player, timeAdventure), timeMs);
  }

  private endAdventures = async (
    playerId: string,
    testTime: number,
    compassCost: number,
    player: types.playerType,
    timeAdventure: { startTime: number; endTime: number; goBackTime: number },
  ) => {
    /**получаем нужное количество опыта для поднятия уровня*/
    const nextLeveCapasity = levelCheckNextUp(player.level);
    /**получаем рандомное количество опыта за путишествие в зависимости сколько очков компаса было потрачено*/
    const randomAdventureObj =
      compassCost === 1 ? randomSumAdventure.quiucklyAdventure() : randomSumAdventure.longAdventure();
    /**проверяем не превышает трубуемое  количество опыта на след.ур. предыдушего опыта с рандомно полученным опытом*/
    const sheckExperientsforLevel = player.experience + randomAdventureObj.expereince > nextLeveCapasity;
    /**если опыт привысил нужное количество опыта на след.ур. тогда уровень игрока повышается*/
    const checkLevel = sheckExperientsforLevel ? player.level + 1 : player.level;
    /**если уровень повысился то получаем остаток и переводим на следующий уровень*/
    const experience = this.checkExperence(player.experience, randomAdventureObj.expereince, nextLeveCapasity);
    /**убираем время с окончания путишествия */
    const adventure = {
      status: true,
      extraction: this.randomExtraction(player.capasity, compassCost === 1),
      ...timeAdventure,
      endTime: 0,
    };
    /**получаем ресурсы с посл. обновления */
    const prevResourceBar = await this.prevResourceBar(playerId);
    /**вычисляем актуальное количество ресурсов */
    const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);
    /**обновляем игрока после путешествия */
    await this.model
      .findByIdAndUpdate(playerId, {
        $inc: { health: -randomAdventureObj.heath },
        level: checkLevel,
        experience,
        adventure,
        resourceBar,
      })
      .then(() => {
        /**запускаем функцию возвращения игрока домой */
        timeout(() => this.returnPlayer(adventure, playerId), testTime);
      });
  };

  private returnPlayer = async (adventure: types.AdventureExtractionType, playerId: string) => {
    /**получаем ресурсы с посл. обновления */
    const prevResourceBar = await this.prevResourceBar(playerId);
    /**вычисляем актуальное количество ресурсов и прибавляем добычу*/
    const resourceBar = resourceBarUpdate.resourceBarAfterUpdate(prevResourceBar, adventure.extraction);
    /**последнее обновление игрока после путешествия */
    await this.model.findByIdAndUpdate(playerId, {
      resourceBar,
      adventure: {
        status: false,
        extraction: { wood: 0, iron: 0, wheat: 0, clay: 0 },
        startTime: 0,
        endTime: 0,
        goBackTime: 0,
      },
    });
  };

  private checkExperence(state: number, income: number, capasity: number): number {
    if (state + income > capasity) {
      return state + income - capasity;
    } else {
      return state + income;
    }
  }

  private randomExtraction(capasity: types.ResourceBarType, quieck: boolean): types.ResourceBarType {
    const map = capasity;
    for (const key in map) {
      map[key] = randomSumAdventure.randomSum(100, quieck ? capasity[key] / 2 : capasity[key]);
    }
    return map;
  }

  async prevResourceBar(playerId: string): Promise<any> {
    return new Promise((resolve, rejected) => {
      const result = this.model.findById(playerId, {
        resourceBar: true,
        capasity: true,
        income: true,
        updatedAt: true,
        _id: false,
      });
      if (!result) {
        rejected('Ошибка');
      } else {
        resolve(result);
      }
    })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }
}

export const adventuresService = new AdventuresService(playerModel);

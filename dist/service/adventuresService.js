import { playerModel } from '../models/index.js';
import { levelCheckNextUp } from '../utils/playerLevelUpRules.js';
import { randomSumAdventure } from '../utils/randomSumAdventure.js';
import { resourceBarUpdate } from '../utils/resourceBarUpdate.js';
import { timeout } from '../utils/timeoutHelpers.js';
class AdventuresService {
    constructor(model) {
        this.model = model;
        this.endAdventures = async (playerId, testTime, compassCost, player, timeAdventure) => {
            const nextLeveCapasity = levelCheckNextUp(player.level);
            const randomAdventureObj = compassCost === 1 ? randomSumAdventure.quiucklyAdventure() : randomSumAdventure.longAdventure();
            const sheckExperientsforLevel = player.experience + randomAdventureObj.expereince > nextLeveCapasity;
            const checkLevel = sheckExperientsforLevel ? player.level + 1 : player.level;
            const experience = this.checkExperence(player.experience, randomAdventureObj.expereince, nextLeveCapasity);
            const adventure = {
                status: true,
                extraction: this.randomExtraction(player.capasity, compassCost === 1),
                ...timeAdventure,
                endTime: 0,
            };
            const prevResourceBar = await this.prevResourceBar(playerId);
            const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);
            await this.model
                .findByIdAndUpdate(playerId, {
                $inc: { health: -randomAdventureObj.heath },
                level: checkLevel,
                experience,
                adventure,
                resourceBar,
            })
                .then(() => {
                timeout(() => this.returnPlayer(adventure, playerId), testTime);
            });
        };
        this.returnPlayer = async (adventure, playerId) => {
            const prevResourceBar = await this.prevResourceBar(playerId);
            const resourceBar = resourceBarUpdate.resourceBarAfterUpdate(prevResourceBar, adventure.extraction);
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
    }
    async adventureActive(body) {
        const { compassCost, timeMs, playerId } = body;
        const prevResourceBar = await this.prevResourceBar(playerId);
        const resourceBar = resourceBarUpdate.resourceBarUpdate(prevResourceBar);
        const nowDate = Date.now();
        const timeAdventure = {
            startTime: nowDate,
            endTime: nowDate + timeMs,
            goBackTime: nowDate + timeMs * 2,
        };
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
        return timeout(() => this.endAdventures(playerId, timeMs, compassCost, player, timeAdventure), timeMs);
    }
    checkExperence(state, income, capasity) {
        if (state + income > capasity) {
            return state + income - capasity;
        }
        else {
            return state + income;
        }
    }
    randomExtraction(capasity, quieck) {
        const map = capasity;
        for (const key in map) {
            map[key] = randomSumAdventure.randomSum(100, quieck ? capasity[key] / 2 : capasity[key]);
        }
        return map;
    }
    async prevResourceBar(playerId) {
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
            }
            else {
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

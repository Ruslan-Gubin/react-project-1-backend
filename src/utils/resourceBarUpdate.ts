import { AdventureExtractionType } from '../types/GameType/AdventureExtractionType.js';
import { playerType } from '../types/GameType/playerType.js';
import { ResourceBarType } from '../types/GameType/ResourceBarType.js';

const MS_IN_HOURS = 3600000;

class ResourceBarUpdate {
  
  private updateResourse(
    lastCount: number,
    incom: number,
    capasity: number,
    timeLastUpdate: string,
    extraction?: number,
  ): number {
    const nowDate = Date.now(); /**текущее время */
    const timeUp = Date.parse(timeLastUpdate); /**переводим дату последнего обновление в мс */
    const lastCountUpdateResource = lastCount; /** последняя сумма после обновления */
    const incomeResource = incom; /** прибыль в n/в.ч данного ресурса */
    const timeDifference = nowDate - timeUp; /**разница времени между обновлением */
    const updatePeriod = MS_IN_HOURS / incomeResource; /** период обновления */
    let count = null;

    if (extraction) {
      count = Math.round(timeDifference / updatePeriod) + lastCountUpdateResource + extraction;
    } else {
      count = Math.round(timeDifference / updatePeriod) + lastCountUpdateResource;
    }

    return count < capasity ? count : capasity;
  }

  resourceBarUpdate(prevResourceBar: playerType): ResourceBarType {
    const map = prevResourceBar.resourceBar;

    for (const key in map) {
      map[key] = this.updateResourse(
        prevResourceBar.resourceBar[key],
        prevResourceBar.income[key],
        prevResourceBar.capasity[key],
        prevResourceBar.updatedAt,
      );
    }
    return map;
  }

  resourceBarAfterUpdate(prevResourceBar: playerType, extraction: ResourceBarType): ResourceBarType {
    const map = prevResourceBar.resourceBar;

    for (const key in map) {
      map[key] = this.updateResourse(
        prevResourceBar.resourceBar[key],
        prevResourceBar.income[key],
        prevResourceBar.capasity[key],
        prevResourceBar.updatedAt,
        extraction[key],
      );
    }
    return map;
  }
}

const resourceBarUpdate = new ResourceBarUpdate();

export { resourceBarUpdate };

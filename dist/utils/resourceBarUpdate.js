const MS_IN_HOURS = 3600000;
class ResourceBarUpdate {
    updateResourse(lastCount, incom, capasity, timeLastUpdate, extraction) {
        const nowDate = Date.now();
        const timeUp = Date.parse(timeLastUpdate);
        const lastCountUpdateResource = lastCount;
        const incomeResource = incom;
        const timeDifference = nowDate - timeUp;
        const updatePeriod = MS_IN_HOURS / incomeResource;
        let count = null;
        if (extraction) {
            count = Math.round(timeDifference / updatePeriod) + lastCountUpdateResource + extraction;
        }
        else {
            count = Math.round(timeDifference / updatePeriod) + lastCountUpdateResource;
        }
        return count < capasity ? count : capasity;
    }
    resourceBarUpdate(prevResourceBar) {
        const map = prevResourceBar.resourceBar;
        for (const key in map) {
            map[key] = this.updateResourse(prevResourceBar.resourceBar[key], prevResourceBar.income[key], prevResourceBar.capasity[key], prevResourceBar.updatedAt);
        }
        return map;
    }
    resourceBarAfterUpdate(prevResourceBar, extraction) {
        const map = prevResourceBar.resourceBar;
        for (const key in map) {
            map[key] = this.updateResourse(prevResourceBar.resourceBar[key], prevResourceBar.income[key], prevResourceBar.capasity[key], prevResourceBar.updatedAt, extraction[key]);
        }
        return map;
    }
}
const resourceBarUpdate = new ResourceBarUpdate();
export { resourceBarUpdate };

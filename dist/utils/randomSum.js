class RandomSumAdventure {
    constructor() {
        this.randomSum = (max, min) => {
            return Math.floor(Math.random() * (max - min) + min);
        };
    }
    quicklyAdventuresHealth() {
        return this.randomSum(5, 25);
    }
    quicklyAdventuresExp() {
        return this.randomSum(15, 35);
    }
    longAdventuresHealth() {
        return this.randomSum(25, 50);
    }
    longAdventuresExp() {
        return this.randomSum(30, 60);
    }
}
const randomSumAdventure = new RandomSumAdventure();
export { randomSumAdventure };

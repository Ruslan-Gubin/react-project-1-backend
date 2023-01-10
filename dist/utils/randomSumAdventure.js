class RandomSum {
    randomSum(max, min) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
class RandomSumAdventure extends RandomSum {
    constructor() {
        super();
    }
    quiucklyAdventure() {
        return { heath: this.quicklyAdventuresHealth(), expereince: this.quicklyAdventuresExp() };
    }
    longAdventure() {
        return { heath: this.longAdventuresHealth(), expereince: this.longAdventuresExp() };
    }
    quicklyAdventuresHealth() {
        return super.randomSum(5, 25);
    }
    quicklyAdventuresExp() {
        return super.randomSum(15, 35);
    }
    longAdventuresHealth() {
        return super.randomSum(25, 50);
    }
    longAdventuresExp() {
        return super.randomSum(30, 60);
    }
}
const randomSumAdventure = new RandomSumAdventure();
export { randomSumAdventure };

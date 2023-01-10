class RandomSum {
  randomSum (max: number, min: number): number  {
    return Math.floor(Math.random() * (max - min) + min);
  }
}


class RandomSumAdventure extends RandomSum {
   constructor() {
    super()
   }

   quiucklyAdventure () {
    return {heath: this.quicklyAdventuresHealth(), expereince: this.quicklyAdventuresExp()}
   }

   longAdventure () {
    return {heath: this.longAdventuresHealth(), expereince: this.longAdventuresExp()}
   }

  quicklyAdventuresHealth(): number{
    return super.randomSum(5, 25)
  } 
  
   quicklyAdventuresExp(): number  {
   return super.randomSum(15, 35)
   }

   longAdventuresHealth(): number {
   return super.randomSum(25, 50)
   }

   longAdventuresExp(): number {
  return super.randomSum(30, 60)
   }
}

const randomSumAdventure = new RandomSumAdventure()

export {randomSumAdventure}
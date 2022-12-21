import { ResurceBarType } from "./ResurceBarType.js"


interface MineUpdateLevelBody extends Record<string, number | string | ResurceBarType> {
  level: number
  income: number
  piple: number
  time: number
  population: number
  resurce: string
  incrementIncome: number
  playerId: string
  idMine: string
  resurceBar: ResurceBarType
  resurceBarAfterUpdate: ResurceBarType
}

export type {MineUpdateLevelBody}
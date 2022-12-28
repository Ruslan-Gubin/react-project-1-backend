import { ResurceBarType } from "./ResurceBarType.js"


interface MineUpdateLevelBody extends Record<string, number | string | ResurceBarType> {
  level: number
  income: number
  piple: number
  time: number
  population: number
  playerId: string
  idMine: string
  resurceBar: ResurceBarType
  resurceBarAfterUpdate: ResurceBarType
  incomeUpdate: ResurceBarType
}

export type {MineUpdateLevelBody}
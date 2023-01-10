import { ResourceBarType } from "./ResourceBarType.js"


interface MineUpdateLevelBody extends Record<string, number | string | ResourceBarType> {
  level: number
  income: number
  piple: number
  time: number
  population: number
  playerId: string
  idMine: string
  resourceBar: ResourceBarType
  incomeUpdate: ResourceBarType
}

export type {MineUpdateLevelBody}
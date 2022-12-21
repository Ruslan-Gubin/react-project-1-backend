import { IUser } from '../userType/IUser.js';
import type { minesGameType } from './resourceType.js';
import { ResurceBarType } from './ResurceBarType.js';


interface playerType {
  user: IUser
  _doc: any
  nameSity: string
  population: number
  resourceBar: ResurceBarType
  capasity: ResurceBarType
  income: ResurceBarType
  mines: minesGameType[]
}

export type {playerType}
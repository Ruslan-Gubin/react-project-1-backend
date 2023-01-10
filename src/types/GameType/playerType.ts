import { IUser } from '../userType/IUser.js';
import { InventoryType } from './InventoryType.js';
import type { minesGameType } from './resourceType.js';
import { ResourceBarType } from './ResourceBarType.js';
import { AdventureExtractionType } from './AdventureExtractionType.js';

interface playerType {
  user: IUser;
  _doc: any;
  nameSity: string;
  population: number;
  resourceBar: ResourceBarType;
  capasity: ResourceBarType;
  income: ResourceBarType;
  mines: minesGameType[];
  inventory: InventoryType[];
  compass: number;
  health: number;
  level: number;
  experience: number;
  adventure: AdventureExtractionType;
  updatedAt: string;
}

export type { playerType };

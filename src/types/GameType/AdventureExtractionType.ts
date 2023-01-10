import { ResourceBarType } from './ResourceBarType.js';

interface AdventureExtractionType {
  status: boolean;
  extraction: ResourceBarType;
  startTime: number;
  endTime: number;
  goBackTime: number;
}

export type { AdventureExtractionType };

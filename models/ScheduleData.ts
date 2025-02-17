import { IOrderable } from './IOrderable';
import { PointOfInterest } from './PointOfInterest';

export interface TimeRange {
  start: string;
  eind?: string;
}

export interface ScheduleData extends IOrderable {
  time: TimeRange | string;
  location?: PointOfInterest;
  name: string;
  description?: string;
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
  type: 'algemene_openingsuren' | undefined;
}

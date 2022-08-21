import { IOrderable } from './IOrderable';
import { PointOfInterest } from './PointOfInterest';

export interface TimeRange {
  startTime: Date;
  endTime?: Date;
}

export interface ScheduleData extends IOrderable {
  time: string;
  location?: PointOfInterest;
  name: string;
  description?: string;
  day: 'Vrijdag' | 'Zaterdag' | 'Zondag';
  type: 'algemene_openingsuren' | undefined;
}

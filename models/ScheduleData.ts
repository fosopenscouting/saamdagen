import { PointOfInterest } from './PointOfInterest';

export interface ScheduleData {
  startTime: Date;
  endTime?: Date;
  location?: PointOfInterest;
  name: string;
  description: string;
}

import { PointOfInterest } from './PointOfInterest';

export interface TimeRange {
  startTime: Date;
  endTime?: Date;
}

export interface ScheduleData {
  time: TimeRange[];
  location?: PointOfInterest;
  name: string;
  description?: string;
}

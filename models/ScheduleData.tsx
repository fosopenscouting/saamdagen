export interface ScheduleData {
    startTime: Date;
    endTime?: Date;
    location: string; // TODO can this be MapMarker? or something to connect locations
    name: string;
    description: string;
}
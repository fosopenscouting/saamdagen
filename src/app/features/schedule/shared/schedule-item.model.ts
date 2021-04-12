import { ScheduleColor } from "./schedule-color.model";

export interface ScheduleItem {
    title: string;
    start: Date;
    end?: Date;
    color: ScheduleColor;
}

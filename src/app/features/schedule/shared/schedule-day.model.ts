import { ScheduleItem } from "./schedule-item.model";

export interface ScheduleDay {
    title: string;
    items: ScheduleItem[];
}
import { Injectable } from '@angular/core';
import { ScheduleItem } from './schedule-item.model';

const NORMAL_EVENT = "#ffff"
const WORKSHOP = "#de9fe"

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

   scheduleItems: ScheduleItem[] = [
    {
      title: 'Grote show op het podium',
      start: new Date('2021-09-26 20:00'),
      end: new Date('2021-09-26 23:59'),
      color: NORMAL_EVENT,
    }
  ]
  constructor() { }
}

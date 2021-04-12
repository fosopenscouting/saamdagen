import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ScheduleColor } from './schedule-color.model';
import { ScheduleDay } from './schedule-day.model';
import { ScheduleItem } from './schedule-item.model';

const NORMAL_EVENT: ScheduleColor = {
  backgroundColor: '#c9db2e',
  borderColor: '#c9db2e'
};

const WORKSHOP: ScheduleColor = {
  backgroundColor: '#ffffff',
  borderColor: '#99cccc'
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private days$: BehaviorSubject<ScheduleDay[]> = new BehaviorSubject<ScheduleDay[]>(null);

  schedule$ = this.days$.asObservable();

  public data: ScheduleDay[] = [
    {
      title: 'Vrijdag',
      items: [
        {
          title: 'Grote show op het podium',
          start: new Date('2021-09-26 20:00'),
          end: new Date('2021-09-26 23:59'),
          color: WORKSHOP,
        },
        {
          title: 'Midnight snack',
          start: new Date('2021-09-26 22:00'),
          end: new Date('2021-09-26 23:00'),
          color: NORMAL_EVENT,
        },
        {
          title: 'Check-in',
          start: new Date('2021-09-26 19:00'),
          color: NORMAL_EVENT,
        }
      ]
    },
    {
      title: 'Zaterdag',
      items: [
        {
          title: 'Ontbijt',
          start: new Date('2021-09-27 10:00'),
          end: new Date('2021-09-27 10:30'),
          color: NORMAL_EVENT,
        },
        {
          title: 'Workshops',
          start: new Date('2021-09-27 11:00'),
          end: new Date('2021-09-27 13:00'),
          color: NORMAL_EVENT,
        },
        {
          title: 'Fuif',
          start: new Date('2021-09-26 23:00'),
          color: NORMAL_EVENT,
        }
      ]
    },
    {
      title: 'Zondag',
      items: [
        {
          title: 'Ontbijt',
          start: new Date('2021-09-28 9:00'),
          end: new Date('2021-09-26 11:00'),
          color: NORMAL_EVENT,
        },
        {
          title: 'Opkuis',
          start: new Date('2021-09-28 12:00'),
          end: new Date('2021-09-28 13:00'),
          color: NORMAL_EVENT,
        }
      ]
    }
  ];

  constructor() { }
}

import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/core/title/app-title.service';
import { ScheduleDay } from '../../shared/schedule-day.model';
import { ScheduleItem } from '../../shared/schedule-item.model';
import { ScheduleService } from '../../shared/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  days: ScheduleDay[];

  constructor(
    private titleService: AppTitleService,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Programma');

    this.days = this.scheduleService.data;
  }

}

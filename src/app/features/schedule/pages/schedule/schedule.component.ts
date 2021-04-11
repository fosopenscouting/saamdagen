import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/core/title/app-title.service';
import { ScheduleItem } from '../../shared/schedule-item.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  scheduleItem: ScheduleItem = {
    title: 'Test',
    color: "#C9DD03",
    start: new Date('2021-09-23 20:00'),
    end: new Date('2021-09-23 23:00'),
  }
  constructor(private titleService: AppTitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Programma');
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ScheduleItem } from '../../shared/schedule-item.model';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {

  @Input() scheduleItem: ScheduleItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}

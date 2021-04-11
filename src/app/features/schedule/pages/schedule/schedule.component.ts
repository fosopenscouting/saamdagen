import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/core/title/app-title.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  constructor(private titleService: AppTitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Programma');
  }

}

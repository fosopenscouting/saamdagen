import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent
  }
];

@NgModule({
  declarations: [ScheduleComponent, ScheduleItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }

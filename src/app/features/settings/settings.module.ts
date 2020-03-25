import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './pages/settings/settings.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/core/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }

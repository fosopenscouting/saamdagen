import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';


const routes: Routes = [
  {
    path: '',
    component: MapComponent
  }
];

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    GoogleMapsModule
  ]
})
export class MapModule { }

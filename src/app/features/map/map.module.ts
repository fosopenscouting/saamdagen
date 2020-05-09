import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import {GoogleMapsModule} from '@angular/google-maps';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';

class MapHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {enable: false}
  };
}

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
    GoogleMapsModule, HammerModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MapHammerConfig
    }
  ]
})
export class MapModule { }

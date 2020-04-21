import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { ScanComponent } from './pages/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MaterialModule } from 'src/app/core/material/material.module';

const routes: Routes = [
{
  path: '',
  component: ProfileComponent
},
 {
   path: 'scan',
   component: ScanComponent
 }
];


@NgModule({
  declarations: [ProfileComponent, ScanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ZXingScannerModule,
    MaterialModule
  ]
})
export class ProfileModule { }

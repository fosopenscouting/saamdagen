import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(mod => mod.SettingsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(
      mod => mod.ProfileModule
    )
  },
  {
    path: 'map',
    loadChildren: () => import('./features/map/map.module').then(mod => mod.MapModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./features/schedule/schedule.module').then(mod => mod.ScheduleModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

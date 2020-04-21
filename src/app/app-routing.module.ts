import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

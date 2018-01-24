import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'home',
        loadChildren: './views/home/home.module#HomeModule'
      },
      {
        path: 'fleet',
        loadChildren: './views/fleet/fleet.module#FleetModule'
      },
      {
        path: 'alert',
        loadChildren: './views/alert-list/alert-list.module#AlertListModule'
      },
      {
        path: 'pmn',
        loadChildren: './views/pmn/pmn.module#PmnModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

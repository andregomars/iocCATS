import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Data Log'
    },
    children: [
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: {
          title: 'Maintenance Log'
        }
      },
      {
        path: 'routine',
        component: RoutingComponent,
        data: {
          title: 'Daily Routine Log'
        }
      },
      {
        path: 'connection',
        component: ConnectionComponent,
        data: {
          title: 'Connection Log'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataLogRoutingModule {}

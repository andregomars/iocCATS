import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'DataLog'
    },
    children: [
      {
        path: 'maintenance',
        component: MaintenanceComponent,
        data: {
          title: 'Maintenance'
        }
      },
      {
        path: 'routing',
        component: RoutingComponent,
        data: {
          title: 'Routing'
        }
      },
      {
        path: 'connection',
        component: ConnectionComponent,
        data: {
          title: 'Connection'
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

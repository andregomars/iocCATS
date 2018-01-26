import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { SnapshotComponent } from './snapshot.component';

const routes: Routes = [
  {
    path: '',
    component: FleetComponent,
    data: {
      title: 'Fleet'
    }
  },
  {
    path: 'snapshot/:id',
    component: SnapshotComponent,
    data: {
      title: 'Snapshot'
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AlertListComponent } from './alert-list.component';

const routes: Routes = [
  {
    path: '',
    component: AlertListComponent,
    data: {
      title: 'Alert'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertListRoutingModule {}

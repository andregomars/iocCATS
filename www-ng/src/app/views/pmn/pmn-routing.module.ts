import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { PmnComponent } from './pmn.component';

const routes: Routes = [
  {
    path: '',
    component: PmnComponent,
    data: {
      title: 'Preventive Maint Notification'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmnRoutingModule {}

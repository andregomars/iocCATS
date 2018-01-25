import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { PmnSettingComponent } from './pmn-setting.component';

const routes: Routes = [
  {
    path: '',
    component: PmnSettingComponent,
    data: {
      title: 'Preventive Maintenance Notification Setting'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmnSettingRoutingModule {}

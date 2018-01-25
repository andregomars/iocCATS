import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { MonthlyReportComponent } from './monthly-report.component';

const routes: Routes = [
  {
    path: '',
    component: MonthlyReportComponent,
    data: {
      title: 'Monthly Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyReportRoutingModule {}

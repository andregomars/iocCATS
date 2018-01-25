import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRoutingModule } from './monthly-report-routing.module';

@NgModule({
  imports: [
    MonthlyReportRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ MonthlyReportComponent ]
})
export class MonthlyReportModule { }

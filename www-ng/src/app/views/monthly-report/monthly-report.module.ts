import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';

import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRoutingModule } from './monthly-report-routing.module';

@NgModule({
  imports: [
    MonthlyReportRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxSelectModule
  ],
  declarations: [ MonthlyReportComponent ]
})
export class MonthlyReportModule { }

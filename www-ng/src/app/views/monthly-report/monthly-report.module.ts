import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSpinKitModule } from 'ng-spin-kit';

import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRoutingModule } from './monthly-report-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MonthlyReportRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSpinKitModule,
    NgxSelectModule
  ],
  declarations: [ MonthlyReportComponent ]
})
export class MonthlyReportModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DpDatePickerModule } from 'ng2-date-picker';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PapaParseModule } from 'ngx-papaparse';

import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRoutingModule } from './monthly-report-routing.module';
import { UtilityService } from 'app/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MonthlyReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    NgxDatatableModule,
    NgSpinKitModule,
    PapaParseModule,
    NgxSelectModule
  ],
  declarations: [ MonthlyReportComponent ],
  providers: [ UtilityService ]
})
export class MonthlyReportModule { }

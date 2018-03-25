import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSpinKitModule } from 'ng-spin-kit';

import { DataLogRoutingModule } from './data-log-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    DataLogRoutingModule,
    ChartsModule,
    NgxDatatableModule,
    NgxSelectModule,
    MyDateRangePickerModule,
    NgSpinKitModule,
    ReactiveFormsModule
  ],
  declarations: [
    MaintenanceComponent,
    RoutingComponent,
    ConnectionComponent
  ]
})
export class DataLogModule { }

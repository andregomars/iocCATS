import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { DataLogRoutingModule } from './data-log-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    DataLogRoutingModule,
    ChartsModule,
    NgxDatatableModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    MaintenanceComponent,
    RoutingComponent,
    ConnectionComponent
  ]
})
export class DataLogModule { }

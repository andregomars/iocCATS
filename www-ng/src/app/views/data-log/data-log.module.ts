import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DpDatePickerModule } from 'ng2-date-picker';

import { DataLogRoutingModule } from './data-log-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';
import { UtilityService } from 'app/services/utility.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    DataLogRoutingModule,
    ChartsModule,
    NgxDatatableModule,
    NgxSelectModule,
    NgSpinKitModule,
    DpDatePickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MaintenanceComponent,
    RoutingComponent,
    ConnectionComponent
  ],
  providers: [ UtilityService ]
})
export class DataLogModule { }

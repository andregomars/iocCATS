import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataLogRoutingModule } from './data-log-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { RoutingComponent } from './routing.component';
import { ConnectionComponent } from './connection.component';

@NgModule({
  imports: [
    DataLogRoutingModule,
    ChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    MaintenanceComponent,
    RoutingComponent,
    ConnectionComponent
  ]
})
export class DataLogModule { }

import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AlertListComponent } from './alert-list.component';
import { AlertListRoutingModule } from './alert-list-routing.module';

@NgModule({
  imports: [
    AlertListRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ AlertListComponent ]
})
export class AlertListModule { }

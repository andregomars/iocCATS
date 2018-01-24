import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PmnComponent } from './pmn.component';
import { PmnRoutingModule } from './pmn-routing.module';

@NgModule({
  imports: [
    PmnRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ PmnComponent ]
})
export class PmnModule { }

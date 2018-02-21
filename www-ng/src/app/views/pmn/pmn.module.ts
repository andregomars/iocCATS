import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PmnComponent } from './pmn.component';
import { PmnRoutingModule } from './pmn-routing.module';
import { AppPipeModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PmnRoutingModule,
    NgxDatatableModule,
    AppPipeModule
  ],
  declarations: [ PmnComponent ]
})
export class PmnModule { }

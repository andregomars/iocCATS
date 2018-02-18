import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PmnSettingComponent } from './pmn-setting.component';
import { PmnSettingRoutingModule } from './pmn-setting-routing.module';
import { AppPipeModule } from 'app/pipes/pipes.module';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    PmnSettingRoutingModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    AppPipeModule
  ],
  declarations: [
    PmnSettingComponent
  ]
})
export class PmnSettingModule { }

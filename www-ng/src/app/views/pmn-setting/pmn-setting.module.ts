import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PmnSettingComponent } from './pmn-setting.component';
import { PmnSettingRoutingModule } from './pmn-setting-routing.module';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    PmnSettingRoutingModule,
    NgxDatatableModule
  ],
  declarations: [
    PmnSettingComponent
  ]
})
export class PmnSettingModule { }

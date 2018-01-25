import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PmnSettingComponent } from './pmn-setting.component';
import { PmnSettingRoutingModule } from './pmn-setting-routing.module';

@NgModule({
  imports: [
    PmnSettingRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ PmnSettingComponent ]
})
export class PmnSettingModule { }

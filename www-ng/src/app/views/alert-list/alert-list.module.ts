import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// 3rd party modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

// components
import { AlertListComponent } from './alert-list.component';
import { AlertComponent } from './alert.component';
import { AlertListRoutingModule } from './alert-list-routing.module';
import { AppPipeModule } from 'app/pipes/pipes.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UtilityService } from 'app/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ChartsModule,
    NgxDatatableModule,
    AlertListRoutingModule,
    NgxDatatableModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    AppPipeModule
  ],
  declarations: [
    AlertListComponent,
    AlertComponent,
  ],
  providers: [
    UtilityService
  ]
})
export class AlertListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//3rd party modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

//components
import { AlertListComponent } from './alert-list.component';
import { AlertComponent } from './alert.component';
import { AlertListRoutingModule } from './alert-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ChartsModule,
    NgxDatatableModule,
    AlertListRoutingModule,
    NgxDatatableModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule
  ],
  declarations: [ 
    AlertListComponent,
    AlertComponent 
  ]
})
export class AlertListModule { }

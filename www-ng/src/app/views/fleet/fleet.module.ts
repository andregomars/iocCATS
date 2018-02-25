import { NgModule, ViewChild, Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FleetComponent } from './fleet.component';
import { FleetRoutingModule } from './fleet-routing.module';
import { AppPipeModule } from 'app/pipes/pipes.module';
import { SnapshotComponent } from './snapshot.component';
import { UtilityService } from 'app/services/utility.service';
import { FleetService } from '../../api/services';
import { RemoteDataService } from '../../services/remote-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FleetRoutingModule,
    ChartsModule,
    NgxDatatableModule,
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    AppPipeModule
  ],
  declarations: [
    FleetComponent,
    SnapshotComponent,
  ],
  providers: [
    UtilityService,
  ]
})
export class FleetModule { }

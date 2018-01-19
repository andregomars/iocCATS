import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

import { FleetComponent } from './fleet.component';
import { FleetRoutingModule } from './fleet-routing.module';

@NgModule({
  imports: [
    FleetRoutingModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2aUGq0zuZMLTgrUG72Wb4LX6nOA_Q4VM'
    }),
    AgmJsMarkerClustererModule
  ],
  declarations: [ FleetComponent ]
})
export class FleetModule { }

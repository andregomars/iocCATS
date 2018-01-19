import { NgModule, ViewChild, Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule, DatatableComponent } from '@swimlane/ngx-datatable';

import { FleetComponent } from './fleet.component';
import { FleetRoutingModule } from './fleet-routing.module';

@NgModule({
  imports: [
    FleetRoutingModule,
    ChartsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2aUGq0zuZMLTgrUG72Wb4LX6nOA_Q4VM'
    }),
    AgmJsMarkerClustererModule
  ],
  declarations: [ FleetComponent ]
})
export class FleetModule { 

  rows = [];

  temp = [];

  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

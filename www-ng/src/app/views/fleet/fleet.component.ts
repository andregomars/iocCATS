import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit {
  vehicles = [];
  locations = [];
  temp = [];
  fleetId = 5256; // AVTA
  dataUrl = `assets/data/fleet/${ this.fleetId }.json`;
  // dataUrl = `https://ioccatsdemo.firebaseio.com/fleet/AVTA.json`;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>(this.dataUrl).subscribe(data => {
      this.temp = [...data.vehicles];
      this.vehicles = data.vehicles;
      this.locations = this.extracLocations(this.vehicles);
    });
  }

  extracLocations(vehicles: Array<any>): Array<any> {
    return vehicles.map(v => {
      let lat = 0;
      let lng = 0;
      if (v.gps_location.length > 0) {
        lat = v.gps_location[0].latitude;
        lng = v.gps_location[0].longitude;
      }
      return {
        bus_number: v.bus_number,
        latitude: lat,
        longitude: lng
      };
    });
  }

  private updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.bus_number.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.vehicles = temp;
    this.locations = this.extracLocations(this.vehicles);
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

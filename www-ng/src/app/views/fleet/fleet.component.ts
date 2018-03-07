import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { AgmMap } from '@agm/core';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit {
  vehicles = [];
  locations = [];
  temp = [];

  // style and class
  defaultMapHeight = 300;
  mapHeight: number;
  classResize: string;
  classDown = 'fa fa-chevron-down fa-lg';
  classUp = 'fa fa-chevron-up fa-lg';

  fleetId = 1;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.mapHeight = this.defaultMapHeight;
    this.classResize = this.classDown;

    this.dataService.getFleetById(this.fleetId).subscribe(data => {
      this.temp = [...data.vehicles];
      this.vehicles = data.vehicles;
      this.locations = this.extracLocations(this.vehicles);
    });

  }

  extracLocations(vehicles: Array<any>): Array<any> {
    return vehicles.map(v => {
      let lat = 0;
      let lng = 0;
      if (v.gps_location && v.gps_location.length > 0) {
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

  resizeMap($event): void {
    $event.preventDefault();
    this.mapHeight = this.mapHeight === this.defaultMapHeight ?
      this.defaultMapHeight * 2 : this.defaultMapHeight;
    this.map.triggerResize();
    this.classResize = this.classResize === this.classDown ?
      this.classUp : this.classDown;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.bus_number.toLowerCase().indexOf(val) !== -1
        || row.online_status.toLowerCase().indexOf(val) !== -1
        || !val;
    });

    // update the rows
    this.vehicles = temp;
    this.locations = this.extracLocations(this.vehicles);
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

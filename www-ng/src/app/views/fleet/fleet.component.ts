import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { AgmMap } from '@agm/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit, OnDestroy {
  spinning = false;
  vehicles = [];
  locations = [];
  temp = [];
  subData: Subscription;

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

    this.subData = Observable.timer(0, 30000)
      .subscribe(() => {
        this.spinning = true;
        this.dataService.getFleetById(this.fleetId).subscribe(data => {
          this.spinning = false;
          this.temp = [...data.vehicles];
          this.vehicles = data.vehicles;
          this.locations = this.extracLocations(this.vehicles);
        });
      });
  }

  ngOnDestroy(): void {
    this.subData.unsubscribe();
  }

  extracLocations(vehicles: Array<any>): Array<any> {
    return vehicles.map(v => {
      // default at LA union station
      let lat = 34.055597;
      let lng = -118.233437;
      if (v.gps_location && v.gps_location.length > 0) {
        lat = v.gps_location[0].latitude;
        lng = v.gps_location[0].longitude;
      }
      return {
        bus_number: v.vehicle_number,
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
      return row.vehicle_number.toLowerCase().indexOf(val) !== -1
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

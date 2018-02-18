import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'alert-list.component.html'
})
export class AlertListComponent implements OnInit {
  alerts = [];
  temp = [];
  dataUrlFleet = `assets/data/fleet/5256.json`;
  dataUrlVehicle = `assets/data/vehicle`;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>(this.dataUrlFleet)
      // map each vehicle to a stream
      .concatMap(f => { return Observable.from(f.vehicles); })
      // fetch each vehicle data
      .mergeMap(v =>
        this.http.get<any>('assets/data/vehicle/' + v['bus_number'] + '.json'))
      // retrive alert list and attach bus number into each alert
      .map(v => v.alert_list.map(a => Object.assign(a, {'bus_number' : v.vehicle_id})))
      // combine multiple arrays into a single array
      .reduce((pre, cur) => [...pre, ...cur] )
      .subscribe(data => {
        this.alerts = data;
        this.temp = this.alerts;
      });
  }

  private updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.bus_number.toLowerCase().indexOf(val) !== -1
        || row.alert_name.toLowerCase().indexOf(val) !== -1
        || row.alert_type.toLowerCase().indexOf(val) !== -1
        || row.alert_time.toLowerCase().indexOf(val) !== -1
        || !val;
    });

    // update the rows
    this.alerts = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

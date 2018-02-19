import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  alertsCritical = [];
  alertsGeneral = [];
  alerts$: Observable<any>;
  fleetId = 5256; // AVTA
  dataUrlFleet = `assets/data/fleet/${ this.fleetId }.json`;
  dataUrlVehicle = 'assets/data/vehicle';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.alerts$ = this.http.get<any>(this.dataUrlFleet)
      // map each vehicle to a stream
      .concatMap(f => { return Observable.from(f.vehicles); })
      // fetch each vehicle data
      .mergeMap(v =>
        this.http.get<any>(`${ this.dataUrlVehicle }/${ v['bus_number'] }.json`))
      // retrive alert list and attach bus number into each alert
      .map(v => v.alert_list.map(a => Object.assign(a, {'bus_number' : v.vehicle_id})))
      // combine multiple arrays into a single array
      .reduce((pre, cur) => [...pre, ...cur] );

    this.alerts$.subscribe((data: Array<string>) => {
      this.alertsCritical = data.filter(a => a['alert_type'] === 'critical');
      this.alertsGeneral = data.filter(a => a['alert_type'] === 'general');

    });
  }

}

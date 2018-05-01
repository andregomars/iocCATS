import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'alert-list.component.html'
})
export class AlertListComponent implements OnInit {
  alerts = [];
  temp = [];
  fleetId = 1;
  dataUrlVehicle = 'assets/data/vehicle';
  userName = 'iocontrols';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    // this.dataService.getFleetById(this.fleetId)
    //   .concatMap(f => Observable.from(f.vehicles))
    //   .mergeMap(v =>
    //     this.dataService.getVehicleById(v['vehicle_id']))
    //   .timeout(2000)
    //   // ignore when one of vehicles not found
    //   .catch(() => new EmptyObservable())
    //   // retrive alert list and attach bus number into each alert
    //   .map(v => v.alert_list.map(a => Object.assign(a, {'vehicle_number' : v.vehicle_number})))
    //   // combine multiple arrays into a single array
    //   .reduce((pre, cur) => [...pre, ...cur] )
    //   .subscribe(data => {
    //     this.alerts = data;
    //     this.temp = this.alerts;
    //   });
    this.dataService.getUserNotification(this.userName)
      .concatMap(data => Observable.from(data.alert_notification))
      .concatMap(a => a['notification_info'].map(info => Object.assign(info, {'alert_type' : a['notification_type']})))
      .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], [])
      .subscribe((data: Array<any>) => {
        this.alerts = data;
        this.temp = this.alerts;
      });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(this.temp);

    // filter our data
    const temp = this.temp.filter(row => {
      return row.vehicle_number.toLowerCase().indexOf(val) !== -1
        || row.alert_desc.toLowerCase().indexOf(val) !== -1
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

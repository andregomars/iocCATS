import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { concatMap, reduce } from 'rxjs/operators';
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
    this.dataService.getUserNotification(this.userName).pipe(
      concatMap(data => from(data.alert_notification))
      ,concatMap(a => a['notification_info'].map(info => Object.assign(info, {'alert_type' : a['notification_type']})))
      ,reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], [])
    )
    .subscribe((data: Array<any>) => {
        this.alerts = data;
        this.temp = this.alerts;
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

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

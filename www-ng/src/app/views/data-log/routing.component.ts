import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';

import { UtilityService } from 'app/services/utility.service';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'routing.component.html'
})
export class RoutingComponent implements OnInit, OnDestroy {
  temp = [];
  data: any;
  sub$: Subscription;
  selectedDate: moment.Moment;
  datePickerConfig: IDatePickerConfig;
  ngxControl: FormControl;
  months: Array<string>;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
    private dataService: RemoteDataService
  ) { }

  private userName = 'iocontrols';
  private fleetId = 1;

  ngOnInit(): void {
    this.initMonthPicker();

    // this.dataService.getFleetById(this.fleetId)
    //   // map each vehicle to a stream
    //   .concatMap(f => { return Observable.from(f.vehicles); })
    //   // fetch each vehicle data
    //   .mergeMap(v =>
    //     this.dataService.getVehicleRoutineLogFile(v['vehicle_id'], this.userName,
    //       null, this.year, this.month, this.resultCount))
    //   .map(m => m.maint_log_file_item.map(r => Object.assign(r, {vehicle_number: m.vehicle_name})))
    //   // ignore when one of vehicles not found
    //   .catch(() => new EmptyObservable())
    //   // combine multiple arrays into a single array
    //   .reduce((pre, cur) => [...pre, ...cur] )
    //   .subscribe(data => {
    //     this.routingLogs = data;
    //     this.temp = this.routingLogs;
    //   });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  loadData(): void {
    const year = this.selectedDate.get('year');
    const month = this.selectedDate.get('month') + 1;

    this.sub$ = this.dataService.getFleetById(this.fleetId)
      // map each vehicle to a stream
      .concatMap(f => { return Observable.from(f.vehicles); })
      // fetch each vehicle data
      .mergeMap(v =>
        this.dataService.getVehicleRoutineLogFile(v['vehicle_id'], this.userName,
          null, year, month, 0))
      .map(m => m.maint_log_file_item.map(r => Object.assign(r, {vehicle_number: m.vehicle_name})))
      // ignore when one of vehicles not found
      .catch(() => new EmptyObservable())
      // combine multiple arrays into a single array
      .reduce((pre, cur) => [...pre, ...cur] )
      .subscribe(data => {
        this.data = data;
        this.temp = this.data;
      });
  }

  initMonthPicker(): void {
    this.selectedDate = moment();
    const dateRange = this.utility.getReportDateRange();
    this.datePickerConfig = {
      disableKeypress: true,
      min: moment(dateRange.beginDate),
      max: moment(dateRange.endDate)
    };
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.vehicle_number.toLowerCase().indexOf(val) !== -1
        // || row.end_time.toLowerCase().indexOf(val) !== -1
        || !val;
    });

    // update the rows
    this.data = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

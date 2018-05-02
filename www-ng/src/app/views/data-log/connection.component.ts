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
  templateUrl: 'connection.component.html'
})
export class ConnectionComponent implements OnInit, OnDestroy {
  temp = [];
  ngxControl: FormControl;
  months: Array<string>;
  data: any;
  sub$: Subscription;
  selectedDate: moment.Moment;
  datePickerConfig: IDatePickerConfig;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient,
    private utility: UtilityService,
    private dataService: RemoteDataService
  ) { }

  private fleetId = 1;
  private userName = 'iocontrols';

  ngOnInit(): void {
    this.initMonthPicker();
    this.loadData();
  }

  loadData(): void {
    const year = this.selectedDate.get('year');
    const month = this.selectedDate.get('month') + 1;

    this.sub$ = this.dataService.getFleetById(this.fleetId)
      // map each vehicle to a stream
      .concatMap(f => { return Observable.from(f.vehicles); })
      // fetch each vehicle data
      .mergeMap(v =>
        // this.http.get<any>(`${ this.dataUrlDebugLog }/${ v['vehicle_id'] }.json`))
        this.dataService.getVehicleDebugLogFile(v['vehicle_id'], this.userName,
          null, 100))
      // ignore when one of vehicles not found
      .catch(() => new EmptyObservable())
      // combine multiple arrays into a single array
      .reduce((pre, cur) => [...pre, ...cur] )
      .subscribe(data => {
        console.log(data);
        this.data = data;
        this.temp = this.data;
      });
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
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
        // || row.file_time.toLowerCase().indexOf(val) !== -1
        || !val;
    });

    // update the rows
    this.data = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { IDatePickerConfig } from 'ng2-date-picker';
import * as moment from 'moment';

import { UtilityService } from 'app/services/utility.service';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'monthly-report.component.html'
})
export class MonthlyReportComponent implements OnInit, OnDestroy {
  spinning = false;
  data$: Observable<any>;
  sub$: Subscription;
  ngxControl: FormControl;

  data: any;
  selectedDate: moment.Moment;
  datePickerConfig: IDatePickerConfig;
  fleetId = 1;
  resultCount = 0;
  userName = 'iocontrols';
  @ViewChild('table')
  public dataTable: DatatableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private utility: UtilityService,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.initMonthPicker();
    this.loadReport();
  }

  ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  loadReport(): void {
    const year = this.selectedDate.get('year');
    const month = this.selectedDate.get('month') + 1;

    this.sub$ = this.dataService.getFleetById(this.fleetId)
      .do(() => this.spinning = true)
      .concatMap(f => Observable.from(f.vehicles))
      .mergeMap(v =>
        this.dataService.getVehicleMaintLogInfo(v['vehicle_id'], this.userName,
            year, month, this.resultCount))
      .catch(e => new EmptyObservable())
      .finally(() => this.spinning = false)
      .map(m => m.maint_info_item)
      .reduce((pre, cur) => [...pre, ...cur])
      .subscribe(data => this.data = data);
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

  exportAsCSV() {
    const columns: TableColumn[] = this.dataTable.columns || this.dataTable._internalColumns;
    const headers =
        columns
            .map((column: TableColumn) => column.name)
            .filter((e) => e);  // remove column without name (i.e. falsy value)

    const rows: any[] = this.dataTable.rows.map((row) => {
      const r = {};
      columns.forEach((column) => {
          if (!column.name) { return; }   // ignore column without name
          if (column.prop) {
              const prop = column.prop;
              r[prop] = (typeof row[prop] === 'boolean') ? (row[prop]) ? 'Yes'
                                                                        : 'No'
                                                          : row[prop];
          } else {
              // special cases handled here
          }
      });
      return r;
    });

    const options = {
        fieldSeparator  : ',',
        quoteStrings    : '"',
        decimalseparator: '.',
        showLabels      : true,
        headers         : headers,
        showTitle       : false,
        title           : 'Report',
        useBom          : true,
    };
    return new Angular2Csv(rows, 'report', options);
  }

}

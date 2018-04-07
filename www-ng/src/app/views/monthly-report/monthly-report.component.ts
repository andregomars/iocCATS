import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'monthly-report.component.html'
})
export class MonthlyReportComponent implements OnInit {
  spinning = false;
  data$: Observable<any>;
  ngxControl: FormControl;

  months: Array<string>;
  fleetId = 1;
  year = 2018;
  month = 3;
  resultCount = 10;
  userName = 'iocontrols';
  @ViewChild('table')
  public dataTable: DatatableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.initSelectBox();

    this.data$ = this.dataService.getFleetById(this.fleetId)
      .do(() => this.spinning = true)
      .concatMap(f => Observable.from(f.vehicles))
      .mergeMap(v =>
        this.dataService.getVehicleMaintLogInfo(v['vehicle_id'], this.userName,
            this.year, this.month, this.resultCount))
      .catch(e => new EmptyObservable())
      .finally(() => this.spinning = false)
      .map(m => m.maint_info_item)
      .reduce((pre, cur) => [...pre, ...cur]);
  }

  initSelectBox(): void {
    this.ngxControl = new FormControl();
    this.months = ['201802', '201801', '201712'];
  }

  // select box section
  public inputTyped(source: string, text: string) {
    console.log('SingleDemoComponent.inputTyped', source, text);
  }

  public doFocus() {
      console.log('SingleDemoComponent.doFocus');
  }

  public doBlur() {
      console.log('SingleDemoComponent.doBlur');
  }

  public doOpen() {
      console.log('SingleDemoComponent.doOpen');
  }

  public doClose() {
      console.log('SingleDemoComponent.doClose');
  }

  public doSelect(value: any) {
      console.log('SingleDemoComponent.doSelect', value);
  }

  public doRemove(value: any) {
      console.log('SingleDemoComponent.doRemove', value);
  }
  // -----

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

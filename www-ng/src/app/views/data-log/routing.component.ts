import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'routing.component.html'
})
export class RoutingComponent implements OnInit {
  routingLogs = [];
  temp = [];
  ngxControl: FormControl;
  months: Array<string>;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  private userName = 'iocontrols';
  private fleetId = 1;
  private resultCount = 10;
  private year = 2018;
  private month = 3;

  ngOnInit(): void {
    this.initSelectBox();

    this.dataService.getFleetById(this.fleetId)
      // map each vehicle to a stream
      .concatMap(f => { return Observable.from(f.vehicles); })
      // fetch each vehicle data
      .mergeMap(v =>
        this.dataService.getVehicleRoutineLogFile(v['vehicle_id'], this.userName,
          null, this.year, this.month, this.resultCount))
      .map(m => m.maint_log_file_item.map(r => Object.assign(r, {vehicle_number: m.vehicle_name})))
      // ignore when one of vehicles not found
      .catch(() => new EmptyObservable())
      // combine multiple arrays into a single array
      .reduce((pre, cur) => [...pre, ...cur] )
      .subscribe(data => {
        this.routingLogs = data;
        this.temp = this.routingLogs;
      });
  }

  initSelectBox(): void {
    this.ngxControl = new FormControl();
    this.months = ['201803', '201802', '201801', '201712'];
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(row => {
      return row.vehicle_number.toLowerCase().indexOf(val) !== -1
        || row.end_time.toLowerCase().indexOf(val) !== -1
        || !val;
    });

    // update the rows
    this.routingLogs = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

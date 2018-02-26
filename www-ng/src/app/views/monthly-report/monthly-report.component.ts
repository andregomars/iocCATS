import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'monthly-report.component.html'
})
export class MonthlyReportComponent implements OnInit {
  data$: Observable<any>;
  ngxControl: FormControl;
  months: Array<string>;
  fleetId = 5256;
  userName = 'u001';

  columns = [
    { name: 'Date', prop: 'date' },
    { name: 'Today Mileage', prop: 'total_mileage' },
    { name: 'Trip Mileage', prop: 'daily_mileage' },
    { name: 'Engine Idle', prop: 'engine_idle_time' },
    { name: 'Mpg', prop: 'mpg' },
    { name: 'Door Usage', prop: 'door_usage' },
    { name: 'Ramp Usage', prop: 'ramp_usage' },
    { name: 'Kneel Usage', prop: 'kneel_usage' },
    { name: 'Havc Usage', prop: 'havc' },
    { name: 'Wiper Usage', prop: 'wiper' },
    { name: 'Headlight Usage', prop: 'headlight' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.initSelectBox();

    this.data$ = this.dataService.getFleetById(this.fleetId)
      .concatMap(f => Observable.from(f.vehicles))
      .mergeMap(v =>
        this.dataService.getVehicleMaintLogInfo(v['vehicle_id'], this.userName))
      .catch(e => new EmptyObservable())
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


}

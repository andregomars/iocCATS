import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

@Component({
  templateUrl: 'pmn-setting.component.html'
})
export class PmnSettingComponent implements OnInit {
  rows$: Observable<any>;

  constructor(
    private http: HttpClient
  ) { }

  private vehicleId = '0001';
  private url = `assets/data/vehicle/preventiveNotifItemSetting/${ this.vehicleId }.json`;

  ngOnInit(): void {
    this.rows$ = this.http.get<any>(this.url)
      .map(r => r.notification_items)
      .catch(e => new EmptyObservable());
  }



}

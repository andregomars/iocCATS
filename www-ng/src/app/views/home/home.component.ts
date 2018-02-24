import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/api/services';

@Component({
  templateUrl: 'home.component.html',
  providers: [
    UserService
  ]
})
export class HomeComponent implements OnInit {
  dataCritical$: Observable<any>;
  dataGeneral$: Observable<any>;
  dataPmn$: Observable<any>;
  data$: Observable<any>;
  userId = 'u001';
  dataUserNotificationURL = `assets/data/user/notification/${ this.userId }.json`;
  // dataUserNotificationURL = `https://ioccatsdemo.firebaseio.com/user/notification/${ this.user }.json`;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.data$ = this.http.get<any>(this.dataUserNotificationURL);
    this.data$ = this.userService.getUserNotification(this.userId);

    this.dataCritical$ = this.data$
      .concatMap(data => Observable.from(data.alert_notification))
      .filter(a => a['notification_type'].toLowerCase() === 'critical')
      .concatMap(a => Observable.from(a['notification_info']))
      .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []);

    this.dataGeneral$ = this.data$
      .concatMap(data => Observable.from(data.alert_notification))
      .filter(a => a['notification_type'].toLowerCase() === 'general')
      .concatMap(a => Observable.from(a['notification_info']))
      .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []);

    this.dataPmn$ = this.data$
      .concatMap(data => Observable.from(data.preventive_notification))
      .concatMap(a => Observable.from(a['notification_info']))
      .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []);

  }
}

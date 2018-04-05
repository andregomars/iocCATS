import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  spinning = false;
  dataCritical$: Observable<any>;
  dataGeneral$: Observable<any>;
  dataPmn$: Observable<any>;
  data$: Observable<any>;
  userName = 'iocontrols';

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.data$ = Observable.timer(0, 30000)
      .do(() => this.spinning = true)
      .switchMap(() =>
        this.dataService.getUserNotification(this.userName))
      .do(() => this.spinning = false)
      .share();

    this.dataCritical$ = this.data$
      .switchMap(data => Observable.from(data.alert_notification))
      .filter(a => a['notification_type'].toLowerCase() === 'critical')
      .map(a => (a['notification_info'] as Array<any>)
        .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []));

    this.dataGeneral$ = this.data$
      .switchMap(data => Observable.from(data.alert_notification))
      .filter(a => a['notification_type'].toLowerCase() === 'general')
      .map(a => (a['notification_info'] as Array<any>)
        .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []));

    this.dataPmn$ = this.data$
      .switchMap(data => Observable.from(data.preventive_notification))
      .map(a => (a['notification_info'] as Array<any>)
        .reduce((pre: Array<any>, cur: Array<any>) => [...pre, ...cur], []));

  }

}

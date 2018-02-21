import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  private alert$: Observable<any>;
  private alertName$: Observable<string>;
  private locations$: Observable<any>;

  private modules$: Observable<any>;
  private snapshots$: Observable<any>;
  private notifications$: Observable<any>;
  private acknowledges$: Observable<any>;

  private colsSnapshot = [
    { name: 'Item', prop: 'item' },
    { name: 'Value', prop: 'value' },
    { name: 'Unit', prop: 'unit' }
  ];

  ngOnInit(): void {
    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .concatMap(alertId =>
        this.http.get<any>(`assets/data/vehicle/alert/${ alertId }.json`)
      );

    this.alertName$ = this.alert$.map(a => a.alert_desc);
    // this.alertName$ = this.alert$
    //   .concatMap(alert =>
    //     this.http.get<any>(`assets/data/vehicle/${ alert.vehicle_id }.json`)
    //       .concatMap(v => Observable.from(v.alert_list))
    //       .filter(a => String(a['alert_id']) === alert.alert_id)
    //   )
    //   .map(a => a['alert_name']);

    this.locations$ = this.alert$
      .concatMap(alert =>
        this.http.get<any>(`assets/data/fleet/${ alert.fleet_id }.json`)
          .concatMap(f => Observable.from(f.vehicles))
          .filter(v => v['bus_number'] === alert.vehicle_id)
      )
      // .map(v => v['gps_location']);
      .switchMap(v => Observable.from(v['gps_location']));

    this.modules$ = this.alert$.map(a => a.module_info);
    this.snapshots$ = this.alert$.map(a => a.item_info);
    this.notifications$ = this.alert$.map(a => a.notif_info);
    this.acknowledges$ = this.alert$.map(a => a.ackd_info);
  }
}

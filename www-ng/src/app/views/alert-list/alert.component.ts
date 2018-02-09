import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit {
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any;
  public lineChartColours: Array<any>;
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  private alert$: Observable<any>;
  private fleet$: Observable<any>;
  private alertName$: Observable<string>;
  private snapshot$: Observable<any>;
  private locations$: Observable<any>;
  private rowsSnapshot = [];
  private rowsNotifyLog = [];
  private rowsAckLog = [];

  private colsSnapshot = [
    { name: 'Item', prop: 'item' },
    { name: 'Value', prop: 'value' },
    { name: 'Unit', prop: 'unit' }
  ];

  private colsNotifyLog = [
    { name: 'Notified' },
    { name: 'Time' }
  ];

  private colsAckLog = [
    { name: 'Acknowledged' },
    { name: 'Time' }
  ];


  ngOnInit(): void {
    // reusable middleware observable
    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .concatMap(alertId =>
        this.http.get<any>(`assets/data/vehicle/alert/${ alertId }.json`)
      );

    this.alertName$ = this.alert$
      .concatMap(alert =>
        this.http.get<any>(`assets/data/vehicle/${ alert.vehicle_id }.json`)
          .concatMap(v => Observable.from(v.alert_list))
          .filter(a => String(a['alert_id']) === alert.alert_id)
      )
      .map(a => a['alert_name']);

    this.locations$ = this.alert$
      .concatMap(alert =>
        this.http.get<any>(`assets/data/fleet/${ alert.fleet_id }.json`)
          .concatMap(f => Observable.from(f.vehicles))
          .filter(v => v['bus_number'] === alert.vehicle_id)
      )
      .map(v => v['gps_location']);

    this.snapshot$ = this.alert$
      .map(a => a.item_info)
      .do(x => console.log(x));

    this.http.get<any>(`assets/data/alert.json`).subscribe(data => {
      this.rowsNotifyLog = data.notifylog;
      this.rowsAckLog = data.acklog;
    });

    // lineChart
    this.lineChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
      {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    this.lineChartOptions = {
      animation: false,
      responsive: true
    };
    this.lineChartColours = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  }
}

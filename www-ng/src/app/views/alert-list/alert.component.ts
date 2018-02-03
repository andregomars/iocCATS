import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'alert.component.html'
})
export class AlertComponent {
  private alert$: Observable<string>;
  rowsSnapshot = [];
  rowsNotifyLog = [];
  rowsAckLog = [];

  colsSnapshot = [
    { name: 'Item' },
    { name: 'Value' },
    { name: 'Unit' }
  ];

  colsNotifyLog = [
    { name: 'Notified' },
    { name: 'Time' }
  ];

  colsAckLog = [
    { name: 'Acknowledged' },
    { name: 'Time' }
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .mergeMap(id => 
        this.http.get<any>(`assets/data/alert-list.json`)
          .map(row => row.find(row => row['id'] === id).alert)
      )
   
    this.http.get<any>(`assets/data/alert.json`).subscribe(data => {
      this.rowsSnapshot = data.snapshot;
      this.rowsNotifyLog = data.notifylog;
      this.rowsAckLog = data.acklog;
    });
  }

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
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
  public lineChartLegend = true;
  public lineChartType = 'line';
}
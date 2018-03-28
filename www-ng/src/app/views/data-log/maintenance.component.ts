import { Component, OnInit } from '@angular/core';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'maintenance.component.html'
})
export class MaintenanceComponent implements OnInit {
  spinning = false;

  // barChart
  public barChartOptions: any;
  public barChartData: any[];
  public barChartLabels: string[];
  public tableData$: Observable<any>;
  public myForm: FormGroup;
  public chart$: Observable<any>;

  rowsMaintenance = [];
  colsMaintenance = [
    { name: 'Date', prop: 'date' },
    { name: 'Today Mileage', prop: 'total_mileage' },
    { name: 'Daily Mileage', prop: 'daily_mileage' },
    { name: 'Engine Idle', prop: 'engine_idle_time' },
    { name: 'Mpg', prop: 'mpg' },
    { name: 'Door Usage', prop: 'door_usage' },
    { name: 'Ramp Usage', prop: 'ramp_usage' },
    { name: 'Kneel Usage', prop: 'kneel_usage' },
    { name: 'Havc Usage', prop: 'havc' },
    { name: 'Wiper Usage', prop: 'wiper' },
    { name: 'Headlight Usage', prop: 'headlight' }
 ];

  myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'mm/dd/yyyy',
      height: '34px',
      width: '250px'
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  private userName = 'iocontrols';
  private fleetId = 1;
  private resultCount = 10;
  private year = 2018;
  private month = 3;

  ngOnInit(): void {
    // init date range picker
    this.myForm = this.formBuilder.group({
      myDateRange: [{
        beginDate: { year: 2018, month: 2, day: 1 },
        endDate: { year: 2018, month: 2, day: 6 }
      }, Validators.required]
    });

    // retrive data source
    this.chart$ = this.dataService.getFleetById(this.fleetId)
      .do(() => this.spinning = true)
      .concatMap(f => { return Observable.from(f.vehicles); })
      .mergeMap(v =>
        this.dataService.getVehicleMaintLogInfo(v['vehicle_id'], this.userName,
          this.year, this.month, this.resultCount))
      .catch(() => new EmptyObservable())
      .finally(() => this.spinning = false)
      .map(m => m.maint_info_item)
      .reduce((pre, cur) => [...pre, ...cur])
      .share();

    this.initChartOptions();
    this.initChartData();
    this.initTableData();
  }

  attachSummaryRow(rows: Array<any>): Array<any> {
    if (!rows || rows.length < 1) {
      return rows;
    }

    const total = rows.reduce((s, r) => {
      const keys = Object.keys(s);
      const copy = Object.assign({}, s);
      keys.forEach((k, i) => {
        if (i === 0) {
          copy[k] = 'SUM';
        } else {
          copy[k] = s[k] + r[k];
        }
      });
      return copy;
    });

    rows.unshift(total);
    return rows;
  }

  initTableData(): void {
    this.tableData$ = this.chart$
      .map(r => this.attachSummaryRow(r));
  }

  initChartData(): void {
    this.chart$.subscribe(logs => {
      const xLabels = logs.map(r => r.date);

      this.barChartLabels = xLabels;
      this.barChartData = [
          {
            label: 'Daily Mileage',
            data: logs.map(l => l.daily_mileage),
            yAxisID: 'yDailyMileage',
          },
          {
            label: 'Total Mileage',
            data: logs.map(l => l.total_mileage),
            yAxisID: 'yTotalMileage',
          },
          {
            label: 'Kneel Usage',
            data: logs.map(l => l.kneel_usage),
            yAxisID: 'yKneelUsage',
          },
          {
            label: 'MPG',
            data: logs.map(l => l.mpg),
            yAxisID: 'yMPG',
          },
        ];
    });
  }

  initChartOptions(): void {
    this.barChartOptions = {
      responsive: true,
      legend: {
        display: true
      },
      scales: {
        yAxes: [
        {
          id: 'yDailyMileage',
          type: 'linear',
          position: 'left',
          scaleLabel: {
            display: true,
            labelString: 'Daily Mileage',
            fontColor: '#4bc0c0'
          },
          ticks: {
            fontColor: '#4bc0c0',
            max: 500,
            min: 0
          }
        },
        {
          id: 'yTotalMileage',
          scaleLabel: {
            display: true,
            labelString: 'Total Mileage',
            fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            max: 15000,
            min: 0
          }
        },
        {
          id: 'yKneelUsage',
          scaleLabel: {
            display: true,
            labelString: 'Kneel Usage',
            fontColor: '#4286f4'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#4286f4',
            max: 100,
            min: 0
          }
        },
        {
          id: 'yMPG',
          scaleLabel: {
            display: true,
            labelString: 'MPG',
            fontColor: '#f47d41'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#f47d41',
            max: 50,
            min: 0
          }
        }
      ]}
    };
  }

  setDateRange(): void {
    // Set date range (today) using the patchValue function
    const date = new Date();
    this.myForm.patchValue({myDateRange: {
        beginDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        },
        endDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
  }

  clearDateRange(): void {
      // Clear the date range using the patchValue function
      this.myForm.patchValue({myDateRange: ''});
  }

}

import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'maintenance.component.html'
})
export class MaintenanceComponent implements OnInit {
  // barChart
  public barChartOptions: any;
  public barChartData: any[];
  public barChartLabels: string[];

  rowsMaintenance = [];
  colsMaintenance = [
    { name: 'Time' },
    { name: 'Todaymileage' },
    { name: 'Dailymileage' },
    { name: 'Engineidle' },
    { name: 'Mpg' },
    { name: 'Doorusage' },
    { name: 'Rampusage' },
    { name: 'Kneelusage' },
    { name: 'Havcusage' },
    { name: 'Wiperusage' },
    { name: 'Headlightusage' }
 ];

  @ViewChild(DatatableComponent) tableMaintenance: DatatableComponent;

  myDateRangePickerOptions: IMyDrpOptions = {
      dateFormat: 'mm/dd/yyyy',
      height: '34px',
      width: '250px'
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  private myForm: FormGroup;
  private chart$: Observable<any>;
  private vehicleId = '0001';

  ngOnInit(): void {
    // init date range picker
    this.myForm = this.formBuilder.group({
      myDateRange: [{
        beginDate: { year: 2018, month: 2, day: 1 },
        endDate: { year: 2018, month: 2, day: 6 }
      }, Validators.required]
    });

    // init chart options
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
              labelString: 'Daily Mileage',
              fontColor: '#565656'
            },
            type: 'linear',
            position: 'right',
            ticks: {
              fontColor: '#565656',
              max: 500,
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
              max: 500,
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
              max: 500,
              min: 0
            }
          }
        ]
      }
    };

    // load chart data
    this.chart$ = this.http.get<any>(`assets/data/vehicle/maintLogInfo/${ this.vehicleId }.json`);
    this.chart$.subscribe(cData => {
      const logs: Array<any> = cData.maint_info_item;
      const xLabels = logs.map(r => r.date);
      console.log(xLabels);

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

import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IMyDrpOptions } from 'mydaterangepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'maintenance.component.html'
})
export class MaintenanceComponent implements OnInit {
  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

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
      // other options...
      dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.fetch((data) => {
      this.rowsMaintenance = data;
    });
  }

  private myForm: FormGroup;

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // Empty string means no initial value. Can be also specific date range for example:
      // {beginDate: {year: 2018, month: 10, day: 9}, endDate: {year: 2018, month: 10, day: 19}}
      // which sets this date range to initial value. It is also possible to set initial
      // value using the selDateRange attribute.

      myDateRange: ['', Validators.required]
      // other controls are here...
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

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/maintenance.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

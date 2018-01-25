import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: 'maintenance.component.html'
})
export class MaintenanceComponent {
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

  constructor() {
    this.fetch((data) => {
      this.rowsMaintenance = data;
    });
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

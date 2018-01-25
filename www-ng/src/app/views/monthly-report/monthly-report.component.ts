import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'monthly-report.component.html'
})
export class MonthlyReportComponent {
  rows = [];

  columns = [
    { name: 'Busno' },
    { name: 'Mileage' },
    { name: 'Tripmileage' },
    { name: 'Engineidle' },
    { name: 'Mpg' },
    { name: 'Doorusage' },
    { name: 'Rampusage' },
    { name: 'Kneelusage' },
    { name: 'Havcusage' },
    { name: 'Wiperusage' },
    { name: 'Headlightusage' }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/monthly-report.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

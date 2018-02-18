import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: 'monthly-report.component.html'
})
export class MonthlyReportComponent implements OnInit {
  rows = [];
  ngxControl: FormControl;
  months: Array<string>;

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

  ngOnInit(): void {
    this.initSelectBox();
  }

  initSelectBox(): void {
    this.ngxControl = new FormControl();
    this.months = ['201802', '201801', '201712'];
  }

  // select box section
  public inputTyped(source: string, text: string) {
    console.log('SingleDemoComponent.inputTyped', source, text);
  }

  public doFocus() {
      console.log('SingleDemoComponent.doFocus');
  }

  public doBlur() {
      console.log('SingleDemoComponent.doBlur');
  }

  public doOpen() {
      console.log('SingleDemoComponent.doOpen');
  }

  public doClose() {
      console.log('SingleDemoComponent.doClose');
  }

  public doSelect(value: any) {
      console.log('SingleDemoComponent.doSelect', value);
  }

  public doRemove(value: any) {
      console.log('SingleDemoComponent.doRemove', value);
  }
  // -----

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/monthly-report.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

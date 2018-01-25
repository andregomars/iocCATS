import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'pmn-setting.component.html'
})
export class PmnSettingComponent {
  rows = [];

  columns = [
    { name: 'Item' },
    { name: 'Bymileage' },
    { name: 'Bydate' },
    { name: 'Byhours' },
    { name: 'Bycount' },
    { name: 'Operation' },
    { name: 'Byvalue' },
    { name: 'Unit' },
    { name: 'Notificationtype' },
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/pmn-setting.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

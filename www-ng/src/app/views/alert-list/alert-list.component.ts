import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: 'alert-list.component.html'
})
export class AlertListComponent {
  rows = [];

  columns = [
    { name: 'Alert' },
    { name: 'Type' },
    { name: 'Time' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/alert-list.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: 'pmn.component.html'
})
export class PmnComponent {
  rowsPmn = [];
  rowsResetLog = [];
  rowsNotifyLog = [];

  colsPmn = [
    { name: 'Item' },
    { name: 'Bymileage' },
    { name: 'Bydate' },
    { name: 'Byhours' },
    { name: 'Byvalue' },
    { name: 'Bycount' },
    { name: 'Notificationtype' },
  ];

  colsResetLog = [
    { name: 'User' },
    { name: 'Resetdate' }
  ];

  colsNotifyLog = [
    { name: 'Notified' },
    { name: 'Time' }
  ];

  @ViewChild(DatatableComponent) tablePmn: DatatableComponent;
  @ViewChild(DatatableComponent) tableResetLog: DatatableComponent;
  @ViewChild(DatatableComponent) tableNotifyLog: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      this.rowsPmn = data.pmn;
      this.rowsResetLog = data.resetlog;
      this.rowsNotifyLog = data.notifylog;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/pmn.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}

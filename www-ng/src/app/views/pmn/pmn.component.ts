import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: 'pmn.component.html'
})
export class PmnComponent implements OnInit {
  rowsPmn = [];
  dataPmn$: Observable<any>;
  notifications$: Observable<any>;
  resets$: Observable<any>;
  user = 'u001';
  dataUserNotificationURL = `assets/data/user/notification/${ this.user }.json`;


  colsPmn = [
    { name: 'Item' },
    { name: 'Bymileage' },
    { name: 'Bydate' },
    { name: 'Byhours' },
    { name: 'Byvalue' },
    { name: 'Bycount' },
    { name: 'Notificationtype' },
  ];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }
}

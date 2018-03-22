import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'pmn.component.html'
})
export class PmnComponent implements OnInit {
  rowsPmn = [];
  dataPmn$: Observable<any>;
  items$: Observable<any>;
  notifications$: Observable<any>;
  resets$: Observable<any>;
  user = 'iocontrols';
  vid = 1;
  pid = 1;


  colsPmn = [
    { name: 'Item', prop: 'item' },
    { name: 'By Mileage', prop: 'odometer' },
    { name: 'Bydate', prop: 'date_usage' },
    { name: 'Byhours', prop: 'hours_usage' },
    { name: 'Byvalue', prop: 'cycle_value' },
    { name: 'Bycount', prop: 'usage_count' },
    { name: 'Notificationtype', prop: 'notificate_type' }
  ];

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    // this.dataPmn$ = this.dataService.getVehicleMaintSetting(this.vid, this.user)
    //   .map(d => d.notification_setting_items);

    this.dataPmn$ = this.dataService.getPreventiveMaintNotifInfo(this.pid,
      this.vid, this.user)
      .share();
    this.items$ = this.dataPmn$.map(d => new Array(d.prevent_notif_list));
    this.resets$ = this.dataPmn$.map(d => d.reset_list);
    this.notifications$ = this.dataPmn$.map(d => d.notif_list);
  }
}

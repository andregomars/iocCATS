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
  data$: Observable<any>;
  dataPmn$: Observable<any>;
  notifications$: Observable<any>;
  resets$: Observable<any>;
  user = 'iocontrols';
  vid = 1;


  colsPmn = [
    { name: 'Item', prop: 'item_name' },
    { name: 'By Mileage', prop: 'mileage_usage' },
    { name: 'Bydate', prop: 'date_usage' },
    { name: 'Byhours', prop: 'hours_usage' },
    { name: 'Byvalue', prop: 'usage_value' },
    { name: 'Bycount', prop: 'usage_count' },
    { name: 'Notificationtype', prop: 'notificate_type' }
  ];

  colsResetLog = [
    { name: 'Reset Date', prop: 'reset_date' },
    { name: 'User', prop: 'username' }
  ];

  colsNotifyLog = [
    { name: 'Notified', prop: 'username' },
    { name: 'Time', prop: 'notified_date' }
  ];

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.dataPmn$ = this.dataService.getVehicleMaintSetting(this.vid, this.user)
      .map(d => d.notification_setting_items);

    this.data$ = this.dataService.getPreventiveMaintNotifInfo(this.vid, this.user)
      .share();
    this.resets$ = this.data$.map(d => d.reset_list);
    this.notifications$ = this.data$.map(d => d.notif_list);
  }
}

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
  // rowsPmn = [];
  dataPmn$: Observable<any>;
  items$: Observable<any>;
  notifications$: Observable<any>;
  resets$: Observable<any>;
  user = 'iocontrols';
  vid = 1;
  pid = 1;

  constructor(
    private http: HttpClient,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.dataPmn$ = this.dataService.getPreventiveMaintNotifInfo(this.pid,
      this.vid, this.user)
      .do(data => console.log(data))
      .share();

    this.items$ = this.dataPmn$.map(d => d.prevent_notif_list);
    this.resets$ = this.dataPmn$.map(d => d.reset_list);
    this.notifications$ = this.dataPmn$.map(d => d.notif_list);
  }
}

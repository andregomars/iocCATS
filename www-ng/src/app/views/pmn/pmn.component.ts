import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'pmn.component.html'
})
export class PmnComponent implements OnInit {
  modalRef: BsModalRef;
  dataPmn$: Observable<any>;
  items$: Observable<any>;
  notifications$: Observable<any>;
  resets$: Observable<any>;
  user = 'iocontrols';
  vid = 1;
  pid = 1;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.dataPmn$ = this.dataService.getPreventiveMaintNotifInfo(this.pid,
      this.vid, this.user)
      .share();

    // this.items$ = this.dataPmn$.map(d => d.prevent_notif_list);
    this.items$ = this.dataPmn$.map(d => new Array(d.prevent_notif_list));
    this.resets$ = this.dataPmn$.map(d => d.reset_list);
    this.notifications$ = this.dataPmn$.map(d => d.notif_list);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log('model opend');
  }
}

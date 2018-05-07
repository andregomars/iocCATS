import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RemoteDataService } from '../../services/remote-data.service';
import { map, concatMap, share } from 'rxjs/operators';

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
  pid = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private modalService: BsModalService,
    private dataService: RemoteDataService
  ) { }

  ngOnInit(): void {
    this.dataPmn$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
      ,concatMap(pid => {
        this.pid = +pid;
        return this.dataService.getPreventiveMaintNotifInfo(+pid,
          this.vid, this.user);
      })
      ,share()
    );

    // this.items$ = this.dataPmn$.map(d => d.prevent_notif_list);
    this.items$ = this.dataPmn$.map(d => new Array(d.prevent_notif_list));
    this.resets$ = this.dataPmn$.map(d => d.reset_list);
    this.notifications$ = this.dataPmn$.map(d => d.notif_list);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(`post Reset with params - uid: ${this.user}, pid: ${this.pid}, vid: ${this.vid}`);
    const res = this.dataService.postPreventiveMaintNotifInfo(this.pid, this.vid, this.user);
    res.subscribe(json => {
      console.log('Reset result: ' + json);
    });
    this.pid = 0;
  }
}

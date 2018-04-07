import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UtilityService } from 'app/services/utility.service';
import { RemoteDataService } from '../../services/remote-data.service';

@Component({
  templateUrl: 'alert.component.html',
  styleUrls: [ 'alert.component.scss' ]
})
export class AlertComponent implements OnInit {
  public modalRef: BsModalRef;
  public defaultModuleIcons: Array<string>;
  public alert$: Observable<any>;
  public locations$: Observable<any>;
  public moduleIcons$: Observable<any>;
  public snapshots$: Observable<any>;
  public notifications$: Observable<any>;
  public acknowledges$: Observable<any>;
  public greyIcons$: Observable<any>;

  public colsSnapshot = [
    { name: 'Item', prop: 'item' },
    { name: 'Value', prop: 'value' },
    { name: 'Unit', prop: 'unit' }
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private utility: UtilityService,
    private modalService: BsModalService,
    private dataService: RemoteDataService
  ) { }

  private userName = 'iocontrols';
  private alertId = 0;

  ngOnInit(): void {
    this.initModuleIcons();

    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .concatMap(alertId => {
        this.alertId = +alertId;
        return this.dataService.getVehicleAlertSnapshotParams(this.userName, +alertId);
      })
      .share();

    // this.alertName$ = this.alert$
    //   .concatMap(alert =>
    //     this.http.get<any>(`assets/data/vehicle/${ alert.vehicle_id }.json`)
    //       .concatMap(v => Observable.from(v.alert_list))
    //       .filter(a => String(a['alert_id']) === alert.alert_id)
    //   )
    //   .map(a => a['alert_name']);

    this.locations$ = this.alert$
      .concatMap(alert =>
        this.dataService.getFleetById(alert.fleet_id)
          .concatMap(f => Observable.from(f.vehicles))
          .filter(v => v['vehicle_id'] === alert.vehicle_id)
      )
      // .map(v => v['gps_location']);
      .switchMap(v => Observable.from(v['gps_location']));

    this.snapshots$ = this.alert$.map(a => a.item_info);
    this.notifications$ = this.alert$.map(a => a.notif_info);
    this.acknowledges$ = this.alert$.map(a => a.ackd_info);
    this.moduleIcons$ = this.alert$.map(a => this.utility.mapIconPaths(a.module_info));
    this.greyIcons$ = this.alert$.map(a => this.utility.getGreyIcons(a.item_info));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    console.log(`post Acknowledge with params - userName: ${this.userName}, alertId: ${this.alertId}`);
    const res = this.dataService.postVehicleAlertSnapshotParams(this.userName, this.alertId);
    res.subscribe(json => {
      console.log('Acknowledge result: ' + json);
    });
    this.alertId = 0;
  }

  private initModuleIcons(): void {
    this.defaultModuleIcons = this.utility.getDefaultIcons();
  }
}

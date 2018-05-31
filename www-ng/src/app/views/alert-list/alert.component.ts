import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable, from } from 'rxjs';
import { concatMap, filter, switchMap, map, share } from 'rxjs/operators';
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
  public location$: Observable<any>;
  public moduleIcons$: Observable<any>;
  public items$: Observable<any>;
  public secondaryModules$: Observable<any>;
  public notifications$: Observable<any>;
  public acknowledges$: Observable<any>;
  // public greyIcons$: Observable<any>;
  public eventTime$: Observable<any>;

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

    this.eventTime$ = this.route.queryParams.pipe(
      map((params: Params) => params['eventtime'])
    );

    this.alert$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      concatMap(alertId => {
        this.alertId = +alertId;
        return this.dataService.getVehicleAlertSnapshotParams(
          this.userName, +alertId);
      }),
      share()
    );

    this.location$ = this.alert$.pipe(
      map(alert => {
        return {
          latitude: alert.lat,
          longitude: alert.lon
        };
    }));

    // this.locations$ = this.alert$.pipe(
    //   concatMap(alert =>
    //     this.dataService.getFleetById(alert.fleet_id).pipe(
    //       concatMap(f => from(f.vehicles)),
    //       filter(v => v['vehicle_id'] === alert.vehicle_id)
    //     )
    //   ),
    //   switchMap(v => from(v['gps_location']))
    // );

    this.items$ = this.alert$.pipe(map(a => a.item_info));
    this.notifications$ =
      this.alert$.pipe(map(a => a.notif_info));
    this.acknowledges$ =
      this.alert$.pipe(map(a => a.ackd_info));
    this.moduleIcons$ =
      this.alert$.pipe(map(a =>
        this.utility.mapIconPaths(a.module_info)));
    this.secondaryModules$ =
      this.alert$.pipe(map(a =>
        this.utility.getSecondaryModules(a.module_info)));
    // this.greyIcons$ =
    //   this.alert$.pipe(map(a => this.utility.getGreyIcons(a.item_info)));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    const res = this.dataService.postVehicleAlertSnapshotParams(this.userName, this.alertId);
    this.alertId = 0;
  }

  private initModuleIcons(): void {
    this.defaultModuleIcons = this.utility.getDefaultIcons();
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable, from } from 'rxjs';
import { concatMap, map, share, filter, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'app/services/utility.service';
import { RemoteDataService } from 'app/services/remote-data.service';

@Component({
  templateUrl: 'snapshot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['snapshot.component.scss']
})
export class SnapshotComponent implements OnInit {
  public defaultModuleIcons: Array<string>;
  // public vehicle$: Observable<any>;
  public snapshot$: Observable<any>;
  public locations$: Observable<any>;

  public moduleIcons$: Observable<any>;
  public items$: Observable<any>;
  public secondaryModules$: Observable<any>;
  // public greyIcons$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private utility: UtilityService,
    private dataService: RemoteDataService
  ) { }

  private userName = 'iocontrols';

  ngOnInit(): void {
    this.initModuleIcons();

    // this.vehicle$ = this.route.paramMap.pipe(
    //   map((params: ParamMap) => params.get('vid')),
    //   concatMap(vid =>
    //     this.dataService.getVehicleById(+vid))
    // );

    // this.alert$ = this.vehicle$.pipe(
    //   concatMap(v =>
    //     this.dataService.getVehicleAlertSnapshotParams(this.userName, v.alert_list[0].alert_id)),
    //   share()
    // );

    // this.alert$ = this.vehicle$.pipe(
    //   concatMap(v =>
    //     this.dataService.getVehicleAlertSnapshotParams(this.userName, v.alert_list[0].alert_id)),
    //   share()
    // );

    // this.locations$ = this.alert$.pipe(
    //   concatMap(alert =>
    //     this.dataService.getFleetById(alert.fleet_id).pipe(
    //       concatMap(f => from(f.vehicles)),
    //       filter(v => v['vehicle_id'] === alert.vehicle_id)
    //     )
    //   ),
    //   switchMap(v => from(v['gps_location']))
    // );

    this.snapshot$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('vid')),
      concatMap(vid =>
        this.dataService.getVehicleById(+vid)),
      share()
    );

    this.locations$ = this.snapshot$.pipe(
      map(snapshot => {
        return {
          latitude: snapshot.lat,
          longitude: snapshot.lon
        };
    }));


    this.items$ = this.snapshot$.pipe(map(a => a.item_info));
    this.moduleIcons$ =
      this.snapshot$.pipe(map(a =>
        this.utility.mapIconPaths(a.module_info)));
    this.secondaryModules$ =
      this.snapshot$.pipe(map(a =>
        this.utility.getSecondaryModules(a.module_info)));
    // this.greyIcons$ =
    //   this.snapshot$.pipe(map(a =>
    //     this.utility.getGreyIcons(a.module_info)));
  }

  private initModuleIcons(): void {
    this.defaultModuleIcons = this.utility.getDefaultIcons();
  }

}

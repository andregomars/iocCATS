import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { UserService, FleetService,
  VehicleService, AlertService } from 'app/api/services';
import { environment, DataSourceType } from 'environments/environment';

@Injectable()
export class RemoteDataService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fleetService: FleetService,
    private vehicleService: VehicleService,
    private alertService: AlertService
  ) {
    this.sourceType = environment.dataSource;

    switch (this.sourceType) {
      case (DataSourceType.Firebase):
        this.rootUrl = environment.firebase.databaseURL;
        break;
      default:
        this.rootUrl = environment.apiRootLocal;
        break;
    }
  }

  private sourceType: DataSourceType;
  private rootUrl: string;

  getUserNotification(userId: string): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return this.userService.getUserNotification(userId);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/user/notification/${ userId }.json`);
    }
  }

  getFleetById(fleetId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return this.fleetService.getFleetById(fleetId);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/fleet/${ fleetId }.json`);
    }
  }

  getVehicleById(vehicleId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return this.vehicleService.getVehicleById(vehicleId);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/${ vehicleId }.json`);
    }
  }

  getVehicleAlertSnapshotParams(vehicleId: number, username: number, alertId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: AlertService.GetVehicleAlertSnapshotParams = {
        vehicleId: vehicleId,
        username: username,
        alertId: alertId
      };
      return this.alertService.getVehicleAlertSnapshot(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/alert/${ alertId }.json`);
    }
  }

/*
    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('vid'))
      .concatMap(vid =>
        this.http.get<any>(`assets/data/vehicle/${ vid }.json`))
      .concatMap(v =>
        this.http.get<any>(`assets/data/vehicle/alert/${ v.alert_list[0].alert_id }.json`));

    this.locations$ = this.alert$
      .concatMap(alert =>
        this.http.get<any>(`assets/data/fleet/${ alert.fleet_id }.json`)
          .concatMap(f => Observable.from(f.vehicles))
          .filter(v => v['bus_number'] === alert.vehicle_id)
      )
*/
}

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

  getPreventiveMaintNotifInfo(vehicleId: number, username: string): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetPreventiveMaintNotifInfoParams = {
        username: username,
        vehicleId: vehicleId
      };
      return this.vehicleService.getPreventiveMaintNotifInfo(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/preventiveNotifItem/${ vehicleId }.json`);
    }
  }

  getVehicleAlertSnapshotParams(username: string, alertId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: AlertService.GetVehicleAlertSnapshotParams = {
        username: username,
        alertId: alertId
      };
      return this.alertService.getVehicleAlertSnapshot(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/alert/${ alertId }.json`);
    }
  }

  getVehicleMaintLogInfo(vehicleId: number, username: string,
    year?: number, month?: number, resultCount?: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetVehicleMaintLogInfoParams = {
        vehicleId: vehicleId,
        username: username,
        year: year,
        month: month,
        resultCount: resultCount
      };
      return this.vehicleService.getVehicleMaintLogInfo(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/maintLogInfo/${ vehicleId }.json`);
    }
  }

  getVehicleRoutineLogFile(vehicleId: number, username: string, zipPkg?: string,
    year?: number, month?: number, resultCount?: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetVehicleRoutineLogFileParams = {
        vehicleId: vehicleId,
        username: username,
        year: year,
        month: month,
        resultCount: resultCount
      };
      return this.vehicleService.getVehicleRoutineLogFile(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/routingLogFileInfo/${ vehicleId }.json`);
    }
  }

  getVehicleDebugLogFile(vehicleId: number, username: string, zipPkg?: string,
    resultCount?: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetVehicleDebugLogFileParams = {
        vehicleId: vehicleId,
        username: username,
        zipPkg: zipPkg,
        resultCount: resultCount
      };
      return this.vehicleService.getVehicleDebugLogFile(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/debugLogFileInfo/${ vehicleId }.json`);
    }
  }

  getVehicleMaintSetting(vehicleId: number, username: string, zipPkg?: string,
    resultCount?: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetVehicleMaintSettingParams = {
        vehicleId: vehicleId,
        username: username
      };
      return this.vehicleService.getVehicleMaintSetting(params);
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/preventiveNotifItemSetting/${ vehicleId }.json`);
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

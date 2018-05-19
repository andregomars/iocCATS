import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
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
        this.delayEmulatorTimer = environment.delayEmulatorTimer;
        this.rootUrl = environment.apiRootLocal;
        break;
    }
  }

  private sourceType: DataSourceType;
  private rootUrl: string;
  private delayEmulatorTimer = 3000;

  getUserNotification(userName: string): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return Object.assign(this.userService.getUserNotification(userName));
    } else {
      return this.http
        .get<any>(`${ this.rootUrl }/user/notification/${ userName }.json`).pipe(
          delay(this.delayEmulatorTimer)
        );
    }
  }

  getFleetById(fleetId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return Object.assign(this.fleetService.getFleetById(fleetId));
    } else {
      return this.http.get<any>(`${ this.rootUrl }/fleet/${ fleetId }.json`);
    }
  }

  getVehicleById(vehicleId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      return Object.assign(this.vehicleService.getVehicleById(vehicleId));
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/${ vehicleId }.json`);
    }
  }

  getPreventiveMaintNotifInfo(preventiveItemId: number,
    vehicleId: number, username: string): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.GetPreventiveMaintNotifInfoParams = {
        preventiveItemID: preventiveItemId,
        username: username,
        vehicleId: vehicleId
      };
      return Object.assign(this.vehicleService.getPreventiveMaintNotifInfo(params));
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
      return Object.assign(this.alertService.getVehicleAlertSnapshot(params));
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
      return Object.assign(this.vehicleService.getVehicleMaintLogInfo(params));
    } else {
      return this.http
        .get<any>(`${ this.rootUrl }/vehicle/maintLogInfo/${ vehicleId }.json`).pipe(
          delay(this.delayEmulatorTimer)
        );
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
        zipPkg: zipPkg as ZipPkg,
        resultCount: resultCount
      };
      return Object.assign(this.vehicleService.getVehicleRoutineLogFile(params));
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
        zipPkg: zipPkg as ZipPkg,
        resultCount: resultCount
      };
      return Object.assign(this.vehicleService.getVehicleDebugLogFile(params));
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
      return Object.assign(this.vehicleService.getVehicleMaintSetting(params));
    } else {
      return this.http.get<any>(`${ this.rootUrl }/vehicle/preventiveNotifItemSetting/${ vehicleId }.json`);
    }
  }

  postPreventiveMaintNotifInfo(preventiveItemId: number,
    vehicleId: number, username: string): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.UpdatePreventiveNotifItemParams = {
        preventiveItemID: preventiveItemId,
        username: username,
        vehicleId: vehicleId,
        resetStatus: 'reset'
      };
      return Object.assign(this.vehicleService.updatePreventiveNotifItem(params));
    } else {
      return this.http.post<any>(`${ this.rootUrl }/vehicle/preventiveNotifItem/${ vehicleId }`, {});
    }
  }

  postVehicleAlertSnapshotParams(username: string, alertId: number): Observable<any> {
    if (this.sourceType === DataSourceType.Swagger) {
      const params: VehicleService.UpdateVehicleAlertSnapshotParams = {
        username: username,
        alertId: alertId,
        ackStatus: 'acknowledged'
      };
      return Object.assign(this.vehicleService.updateVehicleAlertSnapshot(params));
    } else {
      return this.http.post<any>(`${ this.rootUrl }/vehicle/alert/${ alertId }`, {});
    }
  }

}

export type ZipPkg = 'yes' | 'no';

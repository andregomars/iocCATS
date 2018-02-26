import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from 'app/services/utility.service';
import { RemoteDataService } from 'app/services/remote-data.service';

@Component({
  templateUrl: 'snapshot.component.html',
  styleUrls: [ 'snapshot.component.scss' ]
})
export class SnapshotComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private utility: UtilityService,
    private dataService: RemoteDataService
  ) { }

  private vid$: Observable<string>;
  private alert$: Observable<any>;
  private locations$: Observable<any>;

  private moduleIcons$: Observable<any>;
  private snapshots$: Observable<any>;

  private colsSnapshot = [
    { name: 'Item', prop: 'item' },
    { name: 'Value', prop: 'value' },
    { name: 'Unit', prop: 'unit' }
  ];

  ngOnInit(): void {
    this.vid$ = this.route.paramMap
      .map((params: ParamMap) => params.get('vid'));

    this.alert$ = this.route.paramMap
      .map((params: ParamMap) => params.get('vid'))
      .concatMap(vid =>
        // this.http.get<any>(`assets/data/vehicle/${ vid }.json`))
        this.dataService.getVehicleById(vid))
      .do(x => console.log(x))
      .concatMap(v =>
        // this.http.get<any>(`assets/data/vehicle/alert/${ v.alert_list[0].alert_id }.json`));
        this.dataService.getVehicleAlertSnapshotParams(v.vehicle_id, 22, v.alert_list[0].alert_id));

    this.locations$ = this.alert$
      .concatMap(alert =>
        // this.http.get<any>(`assets/data/fleet/${ alert.fleet_id }.json`)
          this.dataService.getFleetById(alert.fleet_id)
          .concatMap(f => Observable.from(f.vehicles))
          .filter(v => v['bus_number'] === alert.vehicle_id)
      )
      // .map(v => v['gps_location']);
      .switchMap(v => Observable.from(v['gps_location']));

    this.snapshots$ = this.alert$.map(a => a.item_info);
    this.moduleIcons$ = this.alert$.map(a => this.utility.mapIconPaths(a.module_info));
  }

}

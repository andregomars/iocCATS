import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'snapshot.component.html',
  styleUrls: [ 'snapshot.component.scss' ]
})
export class SnapshotComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
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

  private icons = [
    { name: 'ENGINE', path: 'assets/img/indicators/engine' },
    { name: 'TRANSMISSION', path: 'assets/img/indicators/transmission' },
    { name: 'ABS', path: 'assets/img/indicators/abs' },
    { name: 'HVAC', path: 'assets/img/indicators/hvac' },
    { name: 'EQULIZER', path: 'assets/img/indicators/equlizer' },
    { name: 'FAN', path: 'assets/img/indicators/fan' },
  ];

  ngOnInit(): void {
    this.vid$ = this.route.paramMap
      .map((params: ParamMap) => params.get('vid'));

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
      // .map(v => v['gps_location']);
      .switchMap(v => Observable.from(v['gps_location']));

    this.snapshots$ = this.alert$.map(a => a.item_info);
    this.moduleIcons$ = this.alert$.map(a => this.mapIconPaths(a.module_info));
  }

  mapIconPaths(modules: Array<any>): Array<string> {
    return this.icons.map(icon => {
      let path = 'assets/img/indicators/engine_na.png';

      try {
        const modules_filtered = modules.filter(module =>
          icon.name === module.module_name.toUpperCase());
        if (modules_filtered.length > 0) {
          if (modules_filtered[0].module_status === 'on') {
            path = `${ icon.path }_online.png`;
          } else {
            path = `${ icon.path }_offline.png`;
          }
        } else {
            path = `${ icon.path }_na.png`;
        }
      } catch { }

      return path;
    });
  }
}

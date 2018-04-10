import { TestBed, async } from '@angular/core/testing';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { NgSpinKitModule } from 'ng-spin-kit';

import { AppPipeModule } from 'app/pipes/pipes.module';
import { FleetComponent } from './fleet.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';

describe('FleetComponent', () => {
  const vehicles = [
    {
        'vehicle_number': '001',
        'engine_status': 'on',
        'gps_location': [
            {
                'altitude': '2393',
                'latitude': '33.934353',
                'longitude': '-117.934343'
            }
        ],
        'odometer': 10033,
        'online_status': 'online',
        'trip_mileage': 122,
        'update_time': '2018-02-23 08:28:00'
    },
    {
        'vehicle_number': '002',
        'engine_status': 'off',
        'gps_location': [
            {
                'altitude': '2393',
                'latitude': '33.954353',
                'longitude': '-117.964343'
            }
        ],
        'odometer': 23580.6,
        'online_status': 'online',
        'trip_mileage': 35.8,
        'update_time': '2018-02-23 10:54:00'
    }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FleetComponent
      ],
      imports: [
        NgxDatatableModule,
        HttpClientModule,
        AgmCoreModule,
        AgmJsMarkerClustererModule,
        RouterModule,
        NgSpinKitModule,
        AppPipeModule,
        ApiModule
      ],
      providers: [
        RemoteDataService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', function() {
    const fixture = TestBed.createComponent(FleetComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

 it('should extract location array', function() {
    const fixture = TestBed.createComponent(FleetComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const test = app.extracLocations(vehicles);
    const fact = [
      {
        bus_number: '001',
        latitude: '33.934353',
        longitude: '-117.934343'
      },
      {
        bus_number: '002',
        latitude: '33.954353',
        longitude: '-117.964343'
      },
    ];
    expect(test).toEqual(fact);
  });


  // it('should have agm-map in app', async(() => {
  //   const fixture = TestBed.createComponent(FleetComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('agm-map')).toBeTruthy();
  // }));

  // it('should render "Bus #" in first col', async(() => {
  //   const fixture = TestBed.createComponent(HomeComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('th').textContent).toContain('Bus #');
  // }));
});

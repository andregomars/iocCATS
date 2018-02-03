import { TestBed, async } from '@angular/core/testing';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { FleetComponent } from './fleet.component';
import { ToNumberPipe } from 'app/pipes';

describe('FleetComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FleetComponent,
        ToNumberPipe
      ],
      imports: [
        NgxDatatableModule,
        AgmCoreModule,
        AgmJsMarkerClustererModule,
        RouterModule
      ],
      providers: [
        { provide: GoogleMapsAPIWrapper },
        { provide: MapsAPILoader },
        { provide: HttpClient },
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', function() {
    const fixture = TestBed.createComponent(FleetComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
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

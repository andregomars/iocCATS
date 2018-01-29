import { TestBed, async } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { By } from '@angular/platform-browser';

import { FleetComponent } from './fleet.component';

describe('FleetComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetComponent ],
      imports: [ 
        NgxDatatableModule,
        AgmCoreModule,
        AgmJsMarkerClustererModule
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

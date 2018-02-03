import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { SnapshotComponent } from './snapshot.component';

describe('SnapshotComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnapshotComponent
      ],
      imports: [
        AgmCoreModule,
        NgxDatatableModule,
        ChartsModule
      ],
      providers: [
        { provide: ActivatedRoute },
        { provide: HttpClient },
        { provide: GoogleMapsAPIWrapper },
        { provide: MapsAPILoader }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SnapshotComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

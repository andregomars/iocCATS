import { TestBed, async } from '@angular/core/testing';
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppPipeModule } from 'app/pipes/pipes.module';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertComponent
      ],
      imports: [
        ModalModule.forRoot(),
        AgmCoreModule,
        NgxDatatableModule,
        AppPipeModule
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
    const fixture = TestBed.createComponent(AlertComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

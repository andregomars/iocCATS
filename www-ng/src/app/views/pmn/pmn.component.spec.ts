import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PmnComponent } from './pmn.component';

describe('PmnComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PmnComponent
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        NgxDatatableModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PmnComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

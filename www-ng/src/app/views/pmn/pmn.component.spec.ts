import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

import { PmnComponent } from './pmn.component';

describe('PmnComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PmnComponent
      ],
      imports: [
        HttpClientModule,
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

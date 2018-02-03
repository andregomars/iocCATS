import { TestBed, async } from '@angular/core/testing';

import { MonthlyReportComponent } from './monthly-report.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

describe('MonthlyReportComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthlyReportComponent
      ],
      imports: [
        NgxDatatableModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MonthlyReportComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

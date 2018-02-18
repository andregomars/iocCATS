import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MonthlyReportComponent } from './monthly-report.component';

describe('MonthlyReportComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthlyReportComponent
      ],
      imports: [
        ReactiveFormsModule,
        NgxSelectModule,
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

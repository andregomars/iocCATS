import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MonthlyReportComponent } from './monthly-report.component';
import { ApiModule } from '../../api/api.module';
import { RemoteDataService } from '../../services/remote-data.service';

describe('MonthlyReportComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthlyReportComponent
      ],
      imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxSelectModule,
        NgxDatatableModule,
        ApiModule
      ],
      providers: [
        RemoteDataService
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

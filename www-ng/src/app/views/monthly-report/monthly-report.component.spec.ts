import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DpDatePickerModule } from 'ng2-date-picker';
import { PapaParseModule } from 'ngx-papaparse';

import { MonthlyReportComponent } from './monthly-report.component';
import { ApiModule } from '../../api/api.module';
import { RemoteDataService } from '../../services/remote-data.service';
import { UtilityService } from 'app/services/utility.service';

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
        FormsModule,
        PapaParseModule,
        DpDatePickerModule,
        NgxSelectModule,
        NgxDatatableModule,
        NgSpinKitModule,
        ApiModule
      ],
      providers: [
        RemoteDataService,
        UtilityService
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

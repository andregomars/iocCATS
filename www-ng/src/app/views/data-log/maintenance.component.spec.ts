import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSpinKitModule } from 'ng-spin-kit';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { MaintenanceComponent } from './maintenance.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';
import { UtilityService } from 'app/services/utility.service';

describe('MaintenanceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MaintenanceComponent
      ],
      imports: [
        HttpClientModule,
        NgxDatatableModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule,
        NgSpinKitModule,
        DpDatePickerModule,
        ApiModule
      ],
      providers: [
        UtilityService,
        RemoteDataService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MaintenanceComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should extract location array', function() {
    const fixture = TestBed.createComponent(MaintenanceComponent);
    const app = fixture.componentInstance;

    const input = [
      {
        date: '20180206',
        daily_mileage: 22,
        total_mileage: 555
      },
      {
        date: '20180207',
        daily_mileage: 11,
        total_mileage: 333
      }
    ];

    const expected = [
      {
        date: 'SUM',
        daily_mileage: 33,
        total_mileage: 888
      },
      {
        date: 'AVG',
        daily_mileage: 16.5,
        total_mileage: 444
      },
      {
        date: '20180206',
        daily_mileage: 22,
        total_mileage: 555
      },
      {
        date: '20180207',
        daily_mileage: 11,
        total_mileage: 333
      }
    ];

    const output = app.attachSummaryRow(input);
    expect(output).toEqual(expected);
  });

});

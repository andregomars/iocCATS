import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';

import { MaintenanceComponent } from './maintenance.component';
import { ChartsModule } from 'ng2-charts';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { HttpClient } from '@angular/common/http';

describe('MaintenanceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MaintenanceComponent
      ],
      imports: [
        NgxDatatableModule,
        ChartsModule,
        MyDateRangePickerModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: HttpClient },
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
        date: 'Summary',
        daily_mileage: 33,
        total_mileage: 888
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

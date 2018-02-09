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
});

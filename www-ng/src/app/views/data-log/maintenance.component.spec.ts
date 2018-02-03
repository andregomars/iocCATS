import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MaintenanceComponent } from './maintenance.component';
import { ChartsModule } from 'ng2-charts';

describe('MaintenanceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MaintenanceComponent 
      ],
      imports: [
        NgxDatatableModule,
        ChartsModule
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

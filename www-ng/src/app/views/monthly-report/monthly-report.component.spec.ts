import { TestBed, async } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { By } from '@angular/platform-browser';

import { MonthlyReportComponent } from './monthly-report.component';

describe('MonthlyReportComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyReportComponent ],
      imports: [ TabsModule.forRoot() ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MonthlyReportComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

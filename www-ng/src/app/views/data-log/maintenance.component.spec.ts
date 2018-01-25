import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MaintenanceComponent } from './maintenance.component';

describe('MaintenanceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceComponent ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MaintenanceComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

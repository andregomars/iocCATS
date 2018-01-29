import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AlertComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

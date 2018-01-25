import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RoutingComponent } from './routing.component';

describe('RoutingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingComponent ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

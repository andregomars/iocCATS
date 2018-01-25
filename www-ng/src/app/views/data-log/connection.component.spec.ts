import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ConnectionComponent } from './connection.component';

describe('ConnectionComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionComponent ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ConnectionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

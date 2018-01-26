import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SnapshotComponent } from './snapshot.component';

describe('SnapshotComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotComponent ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SnapshotComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

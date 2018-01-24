import { TestBed, async } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { By } from '@angular/platform-browser';

import { AlertListComponent } from './alert-list.component';

describe('AlertListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertListComponent ],
      imports: [ TabsModule.forRoot() ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AlertListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

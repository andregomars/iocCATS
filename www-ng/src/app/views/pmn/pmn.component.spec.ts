import { TestBed, async } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { By } from '@angular/platform-browser';

import { PmnComponent } from './pmn.component';

describe('PmnComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PmnComponent ],
      imports: [ TabsModule.forRoot() ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PmnComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

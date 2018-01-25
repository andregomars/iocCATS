import { TestBed, async } from '@angular/core/testing';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { By } from '@angular/platform-browser';

import { PmnSettingComponent } from './pmn-setting.component';

describe('PmnSettingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PmnSettingComponent ],
      imports: [ TabsModule.forRoot() ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PmnSettingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

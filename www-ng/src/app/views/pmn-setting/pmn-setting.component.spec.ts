import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PmnSettingComponent } from './pmn-setting.component';

describe('PmnSettingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PmnSettingComponent
      ],
      imports: [
        NgxDatatableModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PmnSettingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

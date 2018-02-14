import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PmnSettingComponent } from './pmn-setting.component';
import { AppPipeModule } from 'app/pipes/pipes.module';

describe('PmnSettingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PmnSettingComponent
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgxSelectModule,
        ModalModule.forRoot(),
        AppPipeModule
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

import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { PmnSettingComponent } from './pmn-setting.component';
import { AppPipeModule } from 'app/pipes/pipes.module';
import { ApiModule } from '../../api/api.module';
import { RemoteDataService } from '../../services/remote-data.service';

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
        ModalModule.forRoot(),
        AppPipeModule,
        ApiModule
      ],
      providers: [
        RemoteDataService
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

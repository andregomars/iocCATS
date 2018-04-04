import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

import { PmnComponent } from './pmn.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';

describe('PmnComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PmnComponent
      ],
      imports: [
        HttpClientModule,
        ModalModule.forRoot(),
        NgxDatatableModule,
        ApiModule
      ],
      providers: [
        RemoteDataService,
        { provide: ActivatedRoute }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(PmnComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AlertListComponent } from './alert-list.component';
import { AppPipeModule } from 'app/pipes/pipes.module';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';

describe('AlertListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertListComponent
      ],
      imports: [
        HttpClientModule,
        NgxDatatableModule,
        RouterModule,
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
    const fixture = TestBed.createComponent(AlertListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

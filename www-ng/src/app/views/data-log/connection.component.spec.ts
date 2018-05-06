import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';

import { ConnectionComponent } from './connection.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';
import { UtilityService } from 'app/services/utility.service';

describe('ConnectionComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConnectionComponent
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NgxSelectModule,
        NgxDatatableModule,
        ApiModule
      ],
      providers: [
        UtilityService,
        RemoteDataService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(ConnectionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';

import { RoutingComponent } from './routing.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';

describe('RoutingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutingComponent
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        NgxSelectModule,
        NgxDatatableModule,
        ApiModule
      ],
      providers: [
        RemoteDataService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(RoutingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

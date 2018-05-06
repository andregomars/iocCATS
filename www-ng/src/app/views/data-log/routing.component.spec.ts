import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';
import { DpDatePickerModule } from 'ng2-date-picker';

import { RoutingComponent } from './routing.component';
import { RemoteDataService } from '../../services/remote-data.service';
import { ApiModule } from '../../api/api.module';
import { UtilityService } from 'app/services/utility.service';

describe('RoutingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutingComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        DpDatePickerModule,
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
    const fixture = TestBed.createComponent(RoutingComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

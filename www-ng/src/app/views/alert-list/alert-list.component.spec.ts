import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AlertListComponent } from './alert-list.component';
import { AppPipeModule } from 'app/pipes/pipes.module';

describe('AlertListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertListComponent
      ],
      imports: [
        NgxDatatableModule,
        RouterModule,
        AppPipeModule
      ],
      providers: [
        { provide: HttpClient }
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

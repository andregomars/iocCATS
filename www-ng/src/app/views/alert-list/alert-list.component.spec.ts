import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';

import { AlertListComponent } from './alert-list.component';

describe('AlertListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlertListComponent
      ],
      imports: [
        NgxDatatableModule,
        RouterModule
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

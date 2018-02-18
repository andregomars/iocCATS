import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSelectModule } from 'ngx-select-ex';

import { RoutingComponent } from './routing.component';

describe('RoutingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutingComponent
      ],
      imports: [
        ReactiveFormsModule,
        NgxSelectModule,
        NgxDatatableModule
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

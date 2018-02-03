import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { RoutingComponent } from './routing.component';

describe('RoutingComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoutingComponent
      ],
      imports: [
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

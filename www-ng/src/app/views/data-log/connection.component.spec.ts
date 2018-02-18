import { TestBed, async } from '@angular/core/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { ConnectionComponent } from './connection.component';

describe('ConnectionComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConnectionComponent
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
    const fixture = TestBed.createComponent(ConnectionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});

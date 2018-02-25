import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppPipeModule } from 'app/pipes/pipes.module';
import { HomeComponent } from './home.component';
import { ApiConfiguration } from 'app/api/api-configuration';
import { UserService } from '../../api/services';
import { RemoteDataService } from '../../services/remote-data.service';

describe('HomeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        RouterModule,
        HttpClientModule,
        TabsModule.forRoot(),
        NgxDatatableModule,
        AppPipeModule
      ],
      providers: [
        ApiConfiguration,
        UserService,
        RemoteDataService
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it('should have bootstrap table in app', async(() => {
  //   const fixture = TestBed.createComponent(HomeComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement;
  //   expect(compiled.query(By.css('table'))).toBeTruthy();
  // }));

  // it('should render "Bus #" in first col', async(() => {
  //   const fixture = TestBed.createComponent(HomeComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('th').textContent).toContain('Bus #');
  // }));
});

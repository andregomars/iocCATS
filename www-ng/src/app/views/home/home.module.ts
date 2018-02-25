import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppPipeModule } from 'app/pipes/pipes.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { UserService } from '../../api/services';
import { RemoteDataService } from '../../services/remote-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    ChartsModule,
    TabsModule,
    NgxDatatableModule,
    AppPipeModule
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }

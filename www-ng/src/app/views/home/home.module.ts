import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    HomeRoutingModule,
    ChartsModule,
    TabsModule,
    NgxDatatableModule
  ],
  declarations: [ HomeComponent ]
})
export class HomeModule { }

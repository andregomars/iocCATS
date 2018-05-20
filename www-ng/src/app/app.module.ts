import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Provider } from '@angular/core';
import { LocationStrategy,
  PathLocationStrategy,
  HashLocationStrategy} from '@angular/common';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { RemoteDataService } from 'app/services/remote-data.service';
import { ApiConfiguration } from 'app/api/api-configuration';
import { ApiModule } from './api/api.module';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
];

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
];

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

// Import pipes
import {
  AppPipeModule
} from './pipes/pipes.module';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSpinKitModule } from 'ng-spin-kit';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';


export function initApiConfiguration(config: ApiConfiguration): Function {
  return () => {
    if (environment && environment.apiRootIocCATS) {
      config.rootUrl = environment.apiRootIocCATS;
    }
  };
}

export const INIT_API_CONFIGURATION: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initApiConfiguration,
  deps: [ ApiConfiguration ],
  multi: true
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot(environment.agm),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppPipeModule,
    ApiModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES
  ],
  providers: [
    INIT_API_CONFIGURATION,
    RemoteDataService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RemoteDataService } from './remote-data.service';
import { UserService, FleetService } from '../api/services';
import { ApiConfiguration } from '../api/api-configuration';

describe('RemoteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ApiConfiguration,
        UserService,
        FleetService,
        RemoteDataService
      ]
    });
  });

  it('should be created', inject([RemoteDataService], (service: RemoteDataService) => {
    expect(service).toBeTruthy();
  }));
});

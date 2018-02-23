import { TestBed, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should get correct icon path', inject([UtilityService], (service: UtilityService) => {
    const testModuleName = 'transmission';
    const modules = [{
      'module_name': testModuleName.toUpperCase(),
      'module_status': 'on',
      'module_icon_path': '001\\343.png'
    }];

    const expectedPath =
      `assets/img/indicators/${ testModuleName.toLocaleLowerCase() }_online.jpg`;
    const output = service.mapIconPaths(modules);

    expect(output).toContain(expectedPath);
  }));

});

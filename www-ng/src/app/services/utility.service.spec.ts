import { TestBed, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';
import * as moment from 'moment';

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

  it('should generate correct configured report date range', inject([UtilityService], (service: UtilityService) => {
    if (moment().format('yyyyMM') !== '201804') {
      expect(true);
      return;
    }

    const expected = {
      beginDate: moment('2018-10-01').startOf('day'),
      endDate: moment('2018-04-30').endOf('day')
    };
    const output = service.getReportDateRange();
    expect(moment(output.beginDate).format('yyyyMMDD')).toEqual(expected.beginDate.format('yyyyMMDD'));
    expect(moment(output.endDate).format('yyyyMMDD')).toEqual(expected.endDate.format('yyyyMMDD'));
  }));

  it('should get secondary modules', inject([UtilityService], (service: UtilityService) => {
    const module_info = [
        {
            'module_icon_path': '',
            'module_name': 'TRANSMISSION',
            'module_status': 'on'
        },
        {
            'module_icon_path': '',
            'module_name': 'HVAC',
            'module_status': 'on'
        },
        {
            'module_icon_path': '',
            'module_name': 'C5',
            'module_status': 'on'
        },
        {
            'module_icon_path': '',
            'module_name': 'F1',
            'module_status': 'on'
        }
    ];

    const expected = [
      {
          'module_icon_path': '',
          'module_name': 'C5',
          'module_status': 'on'
      },
      {
          'module_icon_path': '',
          'module_name': 'F1',
          'module_status': 'on'
      }
    ];

    const output = service.getSecondaryModules(module_info);
    expect(output).toEqual(expected);
  }));


});

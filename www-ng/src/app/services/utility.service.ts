import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Injectable()
export class UtilityService {
  constructor() { }

  private icons = [
    { name: 'ENGINE', path: 'assets/img/indicators/engine' },
    { name: 'TRANSMISSION', path: 'assets/img/indicators/transmission' },
    { name: 'ABS', path: 'assets/img/indicators/abs' },
    { name: 'HVAC', path: 'assets/img/indicators/hvac' },
    { name: 'EQULIZER', path: 'assets/img/indicators/equlizer' },
    { name: 'FAN', path: 'assets/img/indicators/fan' }
  ];
  private iconCardsCount = 12;

  mapIconPaths(modules: Array<any>): Array<string> {
    return this.icons.map(icon => {
      let path = 'assets/img/indicators/engine_na.jpg';

      try {
        const modules_filtered = modules.filter(module =>
          icon.name === module.module_name.toUpperCase());
        if (modules_filtered.length > 0) {
          if (modules_filtered[0].module_status === 'on') {
            path = `${icon.path}_online.jpg`;
          } else {
            path = `${icon.path}_offline.jpg`;
          }
        } else {
          path = `${icon.path}_na.jpg`;
        }
      } catch { }

      return path;
    });
  }

  getDefaultIcons(): Array<string> {
    return this.icons.map(icon => `${icon.path}_na.jpg`);
  }

  getGreyIcons(items: Array<any>): Array<string> {
    return new Array<string>(this.iconCardsCount - items.length % this.iconCardsCount);
  }

  getReportDateRange(): any {
    let fallbackMonths = 6;
    if (environment.reportFallbackMonths &&
      environment.reportFallbackMonths >= 0) {
      fallbackMonths = environment.reportFallbackMonths;
    }

    const endDate = moment().endOf('month');
    const beginDate = moment().startOf('month').subtract(fallbackMonths, 'months');

    return {
      beginDate: beginDate.toDate(),
      endDate: endDate.toDate()
    };
  }

  getSecondaryModules(modules: Array<any>): Array<any> {
    if (!modules || modules.length < 1) {
      return null;
    }

    return modules.filter(m =>
      this.icons.filter(icon =>
        icon.name === m.module_name.trim().toUpperCase())
      .length === 0);
  }
}

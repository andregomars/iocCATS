import { Injectable } from '@angular/core';

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
}

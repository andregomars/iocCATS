import { Pipe, PipeTransform } from '@angular/core';

/***
 * input example: 2018022308280005
 * output example: Thu Mar 02 2079 13:28:00 GMT-0800 (Pacific Standard Time)
 * ***/
@Pipe({name: 'toTime'})
export class ToTimePipe implements PipeTransform {
  transform(value: any): Date {
    let time = undefined;
    let hour = 0;
    let minute = 0;
    let second = 0;

    if (!value || isNaN(value) || value.length < 8) {
      return time;
    }

    try {
      const year = Number(value.substring(0, 4));
      const month = Number(value.substring(4, 6)) - 1;
      const day = Number(value.substring(6, 8));

      if (value.length > 8) {
        hour = Number(value.substring(8, 10));
        minute = Number(value.substring(10, 12));
        second = Number(value.substring(12, 14));
      }

      time = new Date(year, month, day,
        hour, minute, second);
    } catch {
      time = undefined;
    }

    return time;
  }
}

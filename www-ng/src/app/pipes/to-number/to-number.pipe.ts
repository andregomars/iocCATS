import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toNumber'})
export class ToNumberPipe implements PipeTransform {
  transform(value: any): number {
      return isNaN(value) ? 0 : Number(Number(value).toFixed(6));
  }
}

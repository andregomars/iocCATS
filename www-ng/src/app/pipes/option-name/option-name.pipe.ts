import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'optionName'})
export class OptionName implements PipeTransform {
  transform(value: any, options: Array<any>): string {
    let name: string;
    // switch (value) {
    //   case 'count':
    //     name = 'n';
    //     break;
    //   case 'usage':
    //     name = '%';
    //     break;
    //   default:
    //     name = '';
    // }
    const option = options.filter(o => o.value === value);
    if (option && option.length > 0 && option[0].name) {
      name = option[0].name;
    } else {
      name = '';
    }

    return name;
  }
}

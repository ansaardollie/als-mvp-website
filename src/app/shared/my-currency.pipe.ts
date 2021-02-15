import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCurrency',
})
export class MyCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string | null {
    if (!value) {
      return '';
    }
    const cp = new CurrencyPipe('en-ZA');
    if (value % 1 == 0) {
      return cp.transform(value, 'ZAR', 'symbol-narrow', '1.0-0');
    } else {
      return cp.transform(value, 'ZAR', 'symbol-narrow', '1.2-2');
    }
  }
}

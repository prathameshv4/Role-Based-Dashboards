import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSuffix',
  standalone: true
})
export class NumberSuffixPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) return '';

    const absValue = Math.abs(value);
    let result: string;

    if (absValue < 1000) {
      return value.toString();
    } else if (absValue < 100000) {
      result = (value / 1000).toFixed(2) + 'K';
    } else if (absValue < 10000000) {
      result = (value / 100000).toFixed(2) + 'L';
    } else { //if (absValue < 1000000000)
      result = (value / 10000000).toFixed(2) + 'C';
    }
    // else{
    //   return value.toString();
    // }

    return value < 0 ? '-' + result : result;
  }

}


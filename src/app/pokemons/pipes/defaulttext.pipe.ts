import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaulttext',
})
export class DefaulttextPipe implements PipeTransform {
  transform(value: any): any {
    return value == null ? 'Unknow' : value;
  }
}

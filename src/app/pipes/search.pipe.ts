import { Restaurant } from 'src/app/models/restaurant';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Restaurant[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      // tslint:disable-next-line: no-unused-expression
      if (it.name.toLowerCase().indexOf(searchText) >= 0) {
        return true;
      }
      return false;
    });
  }

}

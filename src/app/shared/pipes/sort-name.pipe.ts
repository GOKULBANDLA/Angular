import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortName'
})
export class SortNamePipe implements PipeTransform {
  constructor() {}

  compare(presentObject, nextObject) {
    if (presentObject.title < nextObject.title) {
      return -1;
    }
    if (nextObject.title > nextObject.title) {
      return 1;
    }
    return 0;
  }

  transform(moviesList: any, name?: any): any {
    if (name === 'Asc') {
      return moviesList.sort(this.compare);
    } else if (name === 'Desc') {
      return moviesList.sort(this.compare).reverse();
    } else {
      return moviesList;
    }
  }
}

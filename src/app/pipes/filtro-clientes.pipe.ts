import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  /* transform(items: any[], searchText: string): any[] {
    if (!items) {return []; }
    if (!searchText) {return items;}
    console.log(items, searchText);
    searchText = searchText.toLowerCase();
    return items.filter( it => {
    return it.toLowerCase().includes(searchText);
    });
   } */
   transform(value, searchinput) {
     console.log(value);
     console.log(searchinput);
     if (!searchinput) {
       console.log('no se escribe nada!')
       return value;
     } else {
       return value.filter(item => {
        if ((typeof item[key] === 'string' || item[key] instanceof String) &&
        (item[key].indexof(searchinput[0]) !== -1)) {
        return true;
    }
     }
    /* if (!searchinput[0]) {
        return value;
    } else if (value) {
        return value.filter(item => {
            for (let key in item) {
                if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                    (item[key].indexOf(searchinput[0]) !== -1)) {
                    return true;
                }
            }
        });
    } */
}


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchString: string, searchOption: string) {
    if(!(value && searchString && searchOption)) {
      return value;
    }

    const searchData: any[] = [];
    for(const data of value) {
       if(data[searchOption] == searchString) {
         searchData.push(data);
       }
    }
    return searchData;



    //return value.filter((data:any) => data[filterOption].toLowerCase().indexOf(filterString) != -1);
    
  }

}
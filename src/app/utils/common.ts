import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { Query } from './../../../src/app/services/products/query.interface';

@Injectable({
  providedIn: 'root'
})

export class Common {

  public static getImageURI = (images:Array<string>, imagePath:string)=> {

    if(imagePath){
      return  Constants.environment.staticAssets + imagePath
    }
    return (
      images.map((val) => {
        return (
          !val.includes(Constants.environment.staticAssets) ? 
            Constants.environment.staticAssets + val: 
            val
        )
      })
      );
  }
  
  public static allowPositiveNum = (event: any) => {
    const pattern = /[1-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
        // invalid character, prevent input
        event.preventDefault();
    }
  }
  
  public static searchProducts = (searchText: any) => {
    if(searchText){
      let qObject = {
        q: searchText
      }
      return qObject;
    } else {
      console.log('Search text is empty')
      return null;
    }
  }

  public static decodeUrlParams = (_query: Query) => {
    let fieldsQuery = {
      price: {
        q: null,
        text: null
      },
      rating: {
        q: null,
        text: null
      }
    }
    
    let defaultQuery = {
      q: '',
      searchedText: _query.searchedText || _query.q,
      releatedSearch: '',
      size: 15,
      cursor: null,
      return: null,
      start: null,
      sort: null,
      parser:'structured',
      fieldsQuery: JSON.stringify(fieldsQuery),
    }
    
    return {...defaultQuery, ..._query}
  }

  public static setUrlParams = (_query: Query) => {
    Object.keys(_query).forEach((key) => {
      if((_query[key] == null) || key == 'parser' || key == 'size' || key == 'fieldsQuery'){
        delete _query[key]
      }});
    return _query
  }
  
}

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
    let updatedQuery = JSON.parse(JSON.stringify(_query))
    let fieldsQuery = {
      price: {
        q: updatedQuery.price,
        text: updatedQuery.price
      },
      rating: {
        q: updatedQuery.rating,
        text: updatedQuery.rating ? updatedQuery.rating +'+' : updatedQuery.rating
      }
    }
    if(updatedQuery.rating && updatedQuery.price){
      updatedQuery.q = `(and '${(updatedQuery.releatedSearch ? updatedQuery.releatedSearch : updatedQuery.searchedText)}' (and (range field=rating [${updatedQuery.rating},${Number(5)}]) (range field=price ${updatedQuery.price})))`
    }else if(updatedQuery.rating){
      updatedQuery.q = `(and '${(updatedQuery.releatedSearch ? updatedQuery.releatedSearch : updatedQuery.searchedText)}' (range field=rating [${updatedQuery.rating},${Number(5)}]))`
    }else if(updatedQuery.price){
      updatedQuery.q =  `(and '${(updatedQuery.releatedSearch ? updatedQuery.releatedSearch : updatedQuery.searchedText)}' (range field=price ${updatedQuery.price}))`
    }

    let defaultQuery = {
      q: '',
      searchedText: updatedQuery.searchedText || updatedQuery.q,
      releatedSearch: '',
      size: 15,
      cursor: null,
      return: null,
      start: null,
      sort: null,
      parser:'structured',
      fieldsQuery: JSON.stringify(fieldsQuery),
    }
    
    return {...defaultQuery, ...updatedQuery}
  }

  public static setUrlParams = (_query: Query) => {
    let updatedQuery = JSON.parse(JSON.stringify(_query))
    Object.keys(updatedQuery).forEach((key) => {
      if(updatedQuery[key] == null || updatedQuery[key] == '' || key == 'parser' || key == 'size' || key == 'fieldsQuery'){
        delete updatedQuery[key]
      }});
      // updatedQuery.q = updatedQuery.searchedText || updatedQuery.q
    return updatedQuery
  }

  public static getIdBasedQueryString = (_productIds: string[]) => {
    let _queryItem = "(term+field=_id+{p})"
    let _queryString: string = "(or+";
    _productIds.forEach((productId) => {
      _queryString = _queryString + _queryItem.replace("{p}", productId)
    })
    _queryString = _queryString + ")"
    return _queryString
  }
}

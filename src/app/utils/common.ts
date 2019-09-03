import { Constants } from './constants';

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
      let qObject = {
        q: searchText,
        searchedText: searchText,
        releatedSearch: null,
        fieldsQuery: JSON.stringify(fieldsQuery),
        size: 15,
        cursor: null,
        return: null,
        start: 0,
        sort: null,
        parser:'structured',
        qdotparser:null
      }
      return qObject;
    } else {
      return null;
    }

  }

}

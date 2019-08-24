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
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {    
        // invalid character, prevent input
        event.preventDefault();
    }
}

}

import { Constants } from './constants';

export class Common {

  public static getImageURI = (images:Array<string>, imagePath:string)=> {

    if(imagePath){
      return  Constants.environment.staticAssets + imagePath
    }
    return (
      images.map((val) => Constants.environment.staticAssets + val)
      );
  }

}

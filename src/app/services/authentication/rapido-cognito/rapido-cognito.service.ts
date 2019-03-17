import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { Constants } from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RapidoCognitoService {

  private _cognitoUserPool: CognitoUserPool

  constructor() {
    this._cognitoUserPool = new CognitoUserPool(Constants.POOL_DATA)
  }

  get cognitoUserPool(){
    return this._cognitoUserPool
  }
}

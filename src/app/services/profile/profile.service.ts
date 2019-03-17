import { Injectable } from '@angular/core';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _cognitoUser: CognitoUser

  constructor() {}

  get cognitoUser(){
    return this._cognitoUser
  }

  set cognitoUser(cognitoUser){
    this._cognitoUser = cognitoUser
  }
}

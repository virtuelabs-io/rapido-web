import { Injectable } from '@angular/core';
import { CognitoUser, ICognitoUserData } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _cognitoUser: CognitoUser;

  constructor() {}

  get cognitoUser() {
    return this._cognitoUser;
  }

  set cognitoUser(cognitoUser: CognitoUser) {
    this._cognitoUser = cognitoUser;
  }

  initializeProfileUsingUserData(iCognitoUserData: ICognitoUserData) {
    this._cognitoUser = new CognitoUser(iCognitoUserData);
  }
}

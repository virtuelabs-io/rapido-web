import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { ProfileService } from '../../profile/profile.service';
import { RapidoCognitoService } from '../rapido-cognito/rapido-cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected _cognitoUserPool: CognitoUserPool
  protected _userProfile: ProfileService

  constructor(profileService: ProfileService, rapidoCognitoService: RapidoCognitoService) {
    this._cognitoUserPool = rapidoCognitoService.cognitoUserPool
    this._userProfile = profileService
  }
}

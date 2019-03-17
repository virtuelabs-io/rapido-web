import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { ProfileService } from '../../profile/profile.service';
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected _cognitoUserPool: CognitoUserPool
  protected _userProfile: ProfileService

  constructor(profileService: ProfileService, virtueCognitoService: VirtueCognitoService) {
    this._cognitoUserPool = virtueCognitoService.cognitoUserPool
    this._userProfile = profileService
  }
}

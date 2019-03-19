import { Injectable } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service';
import { Response } from '../../../utils/response';
import { Constants } from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _profileService: ProfileService
  private _virtueCognitoService: VirtueCognitoService

  constructor(profileService :ProfileService, virtueCognitoService: VirtueCognitoService) {
    this._profileService = profileService
    this._virtueCognitoService = virtueCognitoService
  }

  retrieveSessionIfExists(){
    return new Promise((resolve, reject) => {
      let cognitoUser = this._virtueCognitoService.cognitoUserPool.getCurrentUser()
      if(cognitoUser !== undefined && cognitoUser !== null){
        this._profileService.cognitoUser = cognitoUser
        this._profileService.cognitoUser.getSession(function(err, session) {
          if(err){
            reject(new Response( 1, err.message, err ))
          }
          resolve(new Response( 0, Constants.SESSION_RETRIEVED, session ))
        });
      } else {
        reject(new Response( 1, Constants.SESSION_NOT_FOUND))
      }
    })
  }
}

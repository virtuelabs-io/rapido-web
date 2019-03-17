import { Injectable } from '@angular/core';
import { AuthenticationService } from '../base/authentication.service';
import { ProfileService } from '../../profile/profile.service';
import { RapidoCognitoService } from '../rapido-cognito/rapido-cognito.service';
import { SignUpInterface } from './sign-up.interface';
import { Response } from '../../../utils/response';
import { Constants } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class SignUpService extends AuthenticationService {

  private _signUpData: SignUpInterface

  constructor(profileService: ProfileService, rapidoCognitoService: RapidoCognitoService) {
    super(profileService, rapidoCognitoService)
  }

  set signUpData(signUpData){
    this._signUpData = signUpData
  }

  signUp(){
    let feed = this
    return new Promise((resolve, reject) => {
      this._cognitoUserPool.signUp( feed._signUpData.phone_number, feed._signUpData.password, feed._signUpData.attributeList, null, function(err, result){
          if(err){
            reject(new Response( 1, err.message ))
          }
          else {
            feed._userProfile.cognitoUser = result.user
            resolve( new Response( 0, Constants.SUCCESSFUL_REGISTRATION ))
          }
        })
    })
  }
}

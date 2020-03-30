import { Injectable } from '@angular/core'
import { AuthenticationService } from '../base/authentication.service'
import { ProfileService } from '../profile/profile.service'
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service'
import { SignInInterface } from './sign-in.interface'
import { Response } from '../../../utils/response'
import { Constants } from 'src/app/utils/constants'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'

@Injectable({
  providedIn: 'root',
})
export class SignInService extends AuthenticationService {
  private _signInData: SignInInterface

  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  set signInData(signInData: SignInInterface) {
    this._signInData = signInData
    this._username = signInData.Username
  }

  login() {
    this.initializeNewProfile()
    let feed = this
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.authenticateUser(
        new AuthenticationDetails(this._signInData),
        {
          onSuccess: function (result) {
            resolve(new Response(0, Constants.SUCCESS_SIGN_IN, result))
          },
          onFailure: function (err) {
            reject(new Response(1, Constants.ERROR_SIGN_IN, err))
          },
        }
      )
    })
  }
}

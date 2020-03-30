import { Injectable } from '@angular/core'
import { AuthenticationService } from '../base/authentication.service'
import { ProfileService } from '../profile/profile.service'
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service'
import { Response } from '../../../utils/response'
import { Constants } from '../../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class ConfirmRegistrationService extends AuthenticationService {
  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  confirmRegistration(confirmationCode) {
    this.initializeNewProfile()
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        function (err, result) {
          if (err) {
            reject(
              new Response(1, Constants.ERROR_CONFIRMING_REGISTRATION, err)
            )
          } else {
            resolve(new Response(0, Constants.SUCCESS_CONFIRMING_REGISTRATION))
          }
        }
      )
    })
  }
}

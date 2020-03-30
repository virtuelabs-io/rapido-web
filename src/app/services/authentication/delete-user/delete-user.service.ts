import { Injectable } from '@angular/core'
import { AuthenticationService } from '../base/authentication.service'
import { ProfileService } from '../profile/profile.service'
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service'
import { Response } from '../../../utils/response'
import { Constants } from '../../../utils/constants'

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService extends AuthenticationService {
  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  deleteUser() {
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.deleteUser(function (err, result) {
        if (err) {
          reject(new Response(1, err.message, err))
        }
        resolve(new Response(0, Constants.SUCCESSFULLY_DELETED_USER, result))
      })
    })
  }
}

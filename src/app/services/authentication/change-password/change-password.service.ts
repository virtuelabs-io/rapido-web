import { Injectable } from "@angular/core"
import { ProfileService } from "../profile/profile.service"
import { VirtueCognitoService } from "../virtue-cognito/virtue-cognito.service"
import { AuthenticationService } from "../base/authentication.service"
import { Response } from "../../../utils/response"
import { Constants } from "../../../utils/constants"

@Injectable({
  providedIn: "root",
})
export class ChangePasswordService extends AuthenticationService {
  private _oldPassword: string
  private _newPassword: string

  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  set oldPassword(oldPassword) {
    this._oldPassword = oldPassword
  }

  set newPassword(newPassword) {
    this._newPassword = newPassword
  }

  changePassowrd() {
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.changePassword(
        this._oldPassword,
        this._newPassword,
        function (err, result) {
          if (err) {
            reject(new Response(1, err.message, err))
          }
          resolve(new Response(0, Constants.PASSWORD_CHANGE_SUCCESS, result))
        }
      )
    })
  }
}

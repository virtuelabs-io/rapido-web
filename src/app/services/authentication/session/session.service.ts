import { Injectable } from "@angular/core"
import { ProfileService } from "../profile/profile.service"
import { VirtueCognitoService } from "../virtue-cognito/virtue-cognito.service"
import { AuthenticationService } from "../base/authentication.service"
import { Response } from "../../../utils/response"
import { Constants } from "../../../utils/constants"

@Injectable({
  providedIn: "root",
})
export class SessionService extends AuthenticationService {
  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  retrieveSessionIfExists() {
    return new Promise((resolve, reject) => {
      let cognitoUser = this._cognitoUserPool.getCurrentUser()
      if (cognitoUser !== undefined && cognitoUser !== null) {
        this._userProfile.cognitoUser = cognitoUser
        this._username = this._userProfile.cognitoUser.getUsername()
        this._userProfile.cognitoUser.getSession(function (err, session) {
          if (err) {
            reject(new Response(1, err.message, err))
          }
          resolve(new Response(0, Constants.SESSION_RETRIEVED, session))
        })
      } else {
        reject(new Response(1, Constants.SESSION_NOT_FOUND))
      }
    })
  }
}

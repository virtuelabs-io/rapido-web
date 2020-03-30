import { Injectable } from '@angular/core'
import { AuthenticationService } from '../base/authentication.service'
import { ProfileService } from '../profile/profile.service'
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service'
import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js'
import { Response } from '../../../utils/response'
import { Constants } from '../../../utils/constants'

@Injectable({
  providedIn: 'root',
})
export class UpdateAttributeService extends AuthenticationService {
  private _attributeList: ICognitoUserAttributeData[]

  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService)
  }

  set attributeList(iCognitoUserAttributeData: ICognitoUserAttributeData[]) {
    this._attributeList = iCognitoUserAttributeData
  }

  updateAttributes() {
    let profile: ProfileService = this._userProfile
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.updateAttributes(
        this._attributeList,
        function (err, result) {
          if (err) {
            reject(new Response(1, err.message, err))
          }
          profile.cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              reject(new Response(1, err.message, err))
            }
            resolve(
              new Response(0, Constants.SUCCESSFULLY_UPDATED_ATTRIBUTES, result)
            )
          })
        }
      )
    })
  }
}

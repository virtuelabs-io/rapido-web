import { Injectable } from '@angular/core';
import { ProfileService } from '../profile/profile.service';
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service';
import { AuthenticationService } from '../base/authentication.service';
import { Response } from '../../../utils/response';
import { Constants } from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService extends AuthenticationService {
  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    super(profileService, virtueCognitoService);
  }

  forgotPassword() {
    this.initializeNewProfile();
    let feed = this;
    return new Promise((resolve, reject) => {
      this._userProfile.cognitoUser.forgotPassword({
        onSuccess: function (result) {
          resolve(new Response(0, Constants.FORGOT_PASSWORD_SUCCESS, result));
        },
        onFailure: function (err) {
          reject(new Response(1, err.message, err));
        },
        inputVerificationCode() {
          let verificationCode: string = prompt(
            Constants.INPUT_VERIFICATION_CODE,
            ''
          );
          let newPassword: string = prompt(Constants.ENTER_NEW_PASSWORD, '');
          feed._userProfile.cognitoUser.confirmPassword(
            verificationCode,
            newPassword,
            this
          );
        }
      });
    });
  }
}

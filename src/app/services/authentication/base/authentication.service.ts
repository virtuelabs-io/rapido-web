import { Injectable } from "@angular/core";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { ProfileService } from "../profile/profile.service";
import { VirtueCognitoService } from "../virtue-cognito/virtue-cognito.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  protected _cognitoUserPool: CognitoUserPool;
  protected _userProfile: ProfileService;
  public _username: string;

  constructor(
    profileService: ProfileService,
    virtueCognitoService: VirtueCognitoService
  ) {
    this._cognitoUserPool = virtueCognitoService.cognitoUserPool;
    this._userProfile = profileService;
  }

  set username(username) {
    this._username = username;
  }

  get username() {
    return this._username;
  }

  protected prepareProfile() {
    if (this._userProfile.cognitoUser === undefined) {
      if (this._username === undefined) {
        throw new Error(
          "Username is not set for the authentication service. Please try to use <service>.username = <username>"
        );
      }
      this._userProfile.initializeProfileUsingUserData({
        Username: this._username,
        Pool: this._cognitoUserPool,
      });
    }
  }

  protected initializeNewProfile() {
    if (this._username === undefined) {
      throw new Error(
        "Username is not set for the authentication service. Please try to use <service>.username = <username>"
      );
    }
    this._userProfile.initializeProfileUsingUserData({
      Username: this._username,
      Pool: this._cognitoUserPool,
    });
  }
}

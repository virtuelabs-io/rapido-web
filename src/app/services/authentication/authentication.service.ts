import { User } from './objects/user.interface';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/utils/constants';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private poolData;
  private userPool: CognitoUserPool;
  private cognitoUser;

  constructor() {
    this.poolData = {
      UserPoolId : Constants.USER_POOL_ID,
      ClientId : Constants.CLIENT_ID
    }
    this.userPool = new CognitoUserPool(this.poolData)
  }

  signUp(user: User){
    let userRegistered: Boolean = false;
    let cogUser;
    let usrData = new Promise((resolve, reject) => {
      this.userPool.signUp(user.phone_number, user.password, user.attributeList, null, function(err, result){
          if(err){
            console.log(err);
            reject(err);
          }
          else {
            cogUser = result.user;
            console.log('Customer successfully registered with: ' + cogUser.getUsername());
            userRegistered = true;
            resolve(result.user);
          }
        });
    });
    this.cognitoUser = usrData;
    return userRegistered;
  }
}



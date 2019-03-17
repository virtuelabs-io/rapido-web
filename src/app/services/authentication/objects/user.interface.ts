import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface User {
  phone_number: string,
  password: string,
  attributeList: CognitoUserAttribute[];
}

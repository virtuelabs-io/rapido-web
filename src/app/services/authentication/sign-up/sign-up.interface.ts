import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface SignUpInterface {
  phone_number: string;
  password: string;
  attributeList: CognitoUserAttribute[];
}

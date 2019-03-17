import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface SchemaInterface {
  _attributeList: CognitoUserAttribute[],
  pushItemToAttributeList(cognitoUserAttribute: CognitoUserAttribute): void,
  createCognitoUserAttribute(name: string, value: string): CognitoUserAttribute;
}

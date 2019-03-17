import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { SchemaInterface } from '../helpers/schema.interface';


export class Schema implements SchemaInterface {

  _attributeList;

  constructor(){
    this._attributeList = [];
  }

  get attributeList(){
    return this._attributeList;
  }

  pushItemToAttributeList(cognitoUserAttribute: CognitoUserAttribute): void {
    this._attributeList.push(cognitoUserAttribute);
  }
  createCognitoUserAttribute(name: string, value: string): CognitoUserAttribute {
    return new CognitoUserAttribute({
      Name: name,
      Value: value
    })
  }
}

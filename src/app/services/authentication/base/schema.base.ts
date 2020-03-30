import { CognitoUserAttribute } from "amazon-cognito-identity-js"

export class Schema {
  _attributeList

  constructor() {
    this._attributeList = []
  }

  get attributeList() {
    return this._attributeList
  }

  pushItemToAttributeList(cognitoUserAttribute: CognitoUserAttribute): void {
    this._attributeList.push(cognitoUserAttribute)
  }
  createCognitoUserAttribute(
    name: string,
    value: string
  ): CognitoUserAttribute {
    return new CognitoUserAttribute({
      Name: name,
      Value: value,
    })
  }
}

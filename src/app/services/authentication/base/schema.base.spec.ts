import { TestBed } from '@angular/core/testing'
import { Schema } from './schema.base'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Constants } from '../../../utils/constants'

describe('Schema', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('createCognitoUserAttribute test', () => {
    const _schema: Schema = new Schema()
    let attribute: CognitoUserAttribute = _schema.createCognitoUserAttribute(
      Constants.PHONE_NUMBER,
      '+440000000000'
    )
    expect(attribute).toEqual(jasmine.any(CognitoUserAttribute))
    expect(attribute.getName()).toEqual(Constants.PHONE_NUMBER)
    expect(attribute.getValue()).toEqual('+440000000000')
  })

  it('pushItemToAttributeList test', () => {
    const _schema: Schema = new Schema()
    _schema.pushItemToAttributeList(
      _schema.createCognitoUserAttribute(
        Constants.PHONE_NUMBER,
        '+440000000000'
      )
    )
    expect(_schema.attributeList.length).toBe(1)
  })
})

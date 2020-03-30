import * as uuid from 'uuid'
import { Schema } from '../base/schema.base'
import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js'
import { Constants } from '../../../utils/constants'

export class Registration extends Schema {
  constructor(
    private _phone_number?: string,
    private _email?: string,
    private _name?: string,
    private _password?: string,
    private _acceptedTAndC?: string,
    private _sendMePromotions?: string,
    private _commViaEmail?: string,
    private _commViaSMS?: string,
    private _personalisation?: string,
    private _rapidoId?: string
  ) {
    super()
  }

  set phone_number(phone_number) {
    this._phone_number = phone_number
  }

  get phone_number() {
    return this._phone_number
  }

  set email(email) {
    this._email = email
  }

  get email() {
    return this._email
  }

  set name(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set password(password) {
    this._password = password
  }

  get password() {
    return this._password
  }

  set acceptedTAndC(acceptedTAndC) {
    this._acceptedTAndC = acceptedTAndC
  }

  get acceptedTAndC() {
    return this._acceptedTAndC
  }

  set sendMePromotions(sendMePromotions) {
    this._sendMePromotions = sendMePromotions
  }

  get sendMePromotions() {
    return this._sendMePromotions
  }

  set commViaEmail(commViaEmail) {
    this._commViaEmail = commViaEmail
  }

  get commViaEmail() {
    return this._commViaEmail
  }

  set commViaSMS(commViaSMS) {
    this._commViaSMS = commViaSMS
  }

  get commViaSMS() {
    return this._commViaSMS
  }

  set personalisation(personalisation) {
    this._personalisation = personalisation
  }

  get personalisation() {
    return this._personalisation
  }

  set rapidoId(rapidoId) {
    this._rapidoId = rapidoId
  }

  get rapidoId() {
    return this._rapidoId
  }

  createAttributeList() {
    this.rapidoId = uuid.v4()
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.PHONE_NUMBER,
        this._phone_number
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(Constants.EMAIL, this._email)
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(Constants.NAME, this._name)
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_RAPIDO_ID,
        this._rapidoId
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_ACCEPTED_T_AND_C,
        this._acceptedTAndC
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_SEND_ME_PROMOTIONS,
        this._sendMePromotions
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_COMM_VIA_EMAIL,
        this._commViaEmail
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_COMM_VIA_SMS,
        this._commViaSMS
      )
    )
    super.pushItemToAttributeList(
      super.createCognitoUserAttribute(
        Constants.CUSTOM_PERSONALISATION,
        this._personalisation
      )
    )
  }

  createUpdateAttributeList() {
    let eligibleFields = [
      'email',
      'name',
      'sendMePromotions',
      'commViaEmail',
      'commViaSMS',
      'personalisation',
    ]
    let updateAttributeList: ICognitoUserAttributeData[] = []
    let keyName: string
    eligibleFields.forEach((field) => {
      if (this[field] !== undefined) {
        if (field !== 'email' && field !== 'name') {
          keyName = Constants.CUSTOM + field
        } else {
          keyName = field
        }
        updateAttributeList.push({
          Name: keyName,
          Value: this[field],
        })
      }
    })
    return updateAttributeList
  }
}

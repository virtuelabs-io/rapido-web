
import { Constants } from '../../utils/constants';
export class Charge {

  private _token: string
  private _amount: number
  private _currency: string
  private _description: string
  private _name: string
  private _receiptEmail: string

  constructor(
  ) {
    this._currency = Constants.DEFAULT_CURRENCY_CODE
  }

  set token(token: string){
    this._token = token
  }

  get token(){
    return this._token
  }

  set amount(amount: number){
    this._amount = amount * 100
  }

  get amount(){
    return this._amount
  }

  set currency(currency: string){
    this._currency = currency
  }

  get currency(){
    return this._currency
  }

  set description(description: string){
    this._description = description
  }

  get description(){
    return this._description
  }

  set name(name: string){
    this._name = name
  }

  get name(){
    return this._name
  }

  get receiptEmail(){
    return this._receiptEmail
  }

  set receiptEmail(receiptEmail: string){
    this._receiptEmail = receiptEmail
  }

  toJSON(){
    return {
      "token": this._token,
      "amount": this._amount,
      "currency": this._currency,
      "description": this._description,
      "name": this._name,
      "receiptEmail": this._receiptEmail
    }
  }
}

import { Constants } from "../../utils/constants"
export class Charge {
  private _token: string
  private _description: string
  private _name: string
  private _receiptEmail: string
  private _order_id: number

  constructor() {}

  set token(token: string) {
    this._token = token
  }

  get token() {
    return this._token
  }

  set description(description: string) {
    this._description = description
  }

  get description() {
    return this._description
  }

  set name(name: string) {
    this._name = name
  }

  get name() {
    return this._name
  }

  get receiptEmail() {
    return this._receiptEmail
  }

  set receiptEmail(receiptEmail: string) {
    this._receiptEmail = receiptEmail
  }

  get order_id() {
    return this._order_id
  }

  set order_id(order_id: number) {
    this._order_id = order_id
  }

  toJSON() {
    return {
      token: this._token,
      description: this._description,
      name: this._name,
      receiptEmail: this._receiptEmail,
      order_id: this._order_id,
    }
  }
}

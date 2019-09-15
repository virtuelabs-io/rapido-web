export class GuestCartItem {
  private _session_id: string
  private _product_id: number
  private _quantity: number
  private _in_cart: boolean

  constructor(){
    this._in_cart = true
  }

  set session_id(session_id: string){
    this._session_id = session_id
  }

  get session_id() {
    return this._session_id
  }

  set product_id(product_id: number){
    this._product_id = product_id
  }

  get product_id() {
    return this._product_id
  }

  set quantity(quantity: number){
    this._quantity = quantity
  }

  get quantity() {
    return this._quantity
  }

  toJSON() {
    return {
      "session_id": this._session_id,
      "product_id": this._product_id,
      "quantity": this._quantity,
      "in_cart": this._in_cart
    }
  }
}

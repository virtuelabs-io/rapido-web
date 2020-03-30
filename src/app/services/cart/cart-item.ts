export class CartItem {
  private _product_id: number
  private _quantity: number
  private _in_cart: boolean

  constructor() {}

  set product_id(product_id: number) {
    this._product_id = product_id
  }

  get product_id() {
    return this._product_id
  }

  set quantity(quantity: number) {
    this._quantity = quantity
  }

  get quantity() {
    return this._quantity
  }

  set in_cart(in_cart: boolean) {
    this._in_cart = in_cart
  }

  get in_cart() {
    return this._in_cart
  }

  toJSON() {
    return {
      product_id: this._product_id,
      quantity: this._quantity,
      in_cart: this._in_cart
    }
  }
}

export class GuestCartItem {
  private _product_id: number;
  private _quantity: number;
  private _in_cart: boolean;

  constructor() {
    this._in_cart = true;
  }

  set product_id(product_id: number) {
    this._product_id = product_id;
  }

  get product_id() {
    return this._product_id;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get quantity() {
    return this._quantity;
  }

  toJSON() {
    return {
      product_id: this._product_id,
      quantity: this._quantity,
      in_cart: this._in_cart,
    };
  }
}

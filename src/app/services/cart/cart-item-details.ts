import { CartItem } from './cart-item'

export class CartItemDetails {
  private _cartItem: any
  private _itemDetails: any

  constructor(cartItem: any, itemDetails: any) {
    this._cartItem = cartItem
    this._itemDetails = itemDetails
  }

  get cartItem() {
    return this._cartItem
  }

  set cartItem(cartItem: CartItem) {
    this._cartItem = cartItem
  }

  get itemDetails() {
    return this._itemDetails
  }

  set itemDetails(itemDetails: any) {
    this._itemDetails = itemDetails
  }

  toJSON() {
    return {
      cartItem: this._cartItem,
      itemDetails: this._itemDetails
    }
  }
}

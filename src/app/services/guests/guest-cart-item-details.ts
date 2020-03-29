import { GuestCartItem } from "./guest-cart-item";

export class GuestCartItemDetails {
  private _guestCartItem: any;
  private _itemDetails: any;

  constructor(guestCartItem: any, itemDetails: any) {
    this._guestCartItem = guestCartItem;
    this._itemDetails = itemDetails;
  }

  get guestCartItem() {
    return this._guestCartItem;
  }

  set guestCartItem(guestCartItem: GuestCartItem) {
    this._guestCartItem = guestCartItem;
  }

  get itemDetails() {
    return this._itemDetails;
  }

  set itemDetails(itemDetails: any) {
    this._itemDetails = itemDetails;
  }

  toJSON() {
    return {
      guestCartItem: this._guestCartItem,
      itemDetails: this._itemDetails,
    };
  }
}

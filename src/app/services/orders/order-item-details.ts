export class OrderItemDetails {

  private _orderItem: any
  private _itemDetails: any

  constructor(cartItem: any, itemDetails: any){
    this._orderItem = cartItem
    this._itemDetails = itemDetails
  }

  get orderItem() {
    return this._orderItem
  }

  set cartItem(orderItem: any) {
    this._orderItem = orderItem
  }

  get itemDetails() {
    return this._itemDetails
  }

  set itemDetails(itemDetails: any){
    this._itemDetails = itemDetails
  }

  toJSON() {
    return {
      "orderItem": this.orderItem,
      "itemDetails": this._itemDetails
    }
  }
}

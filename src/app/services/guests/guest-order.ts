export class GuestOrder {
  private _order_id: number;
  private _delivery_cost_id: number;
  private _charge_id: string;

  constructor() {
    this._delivery_cost_id = 1;
  }

  set order_id(order_id: number) {
    this._order_id = order_id;
  }

  get order_id() {
    return this._order_id;
  }

  set delivery_cost_id(delivery_cost_id: number) {
    this._delivery_cost_id = delivery_cost_id;
  }

  get delivery_cost_id() {
    return this._delivery_cost_id;
  }

  set charge_id(charge_id: string) {
    this._charge_id = charge_id;
  }

  get charge_id() {
    return this._charge_id;
  }

  toJSON() {
    return {
      order_id: this._order_id,
      delivery_cost_id: this._delivery_cost_id,
      charge_id: this._charge_id,
    };
  }
}

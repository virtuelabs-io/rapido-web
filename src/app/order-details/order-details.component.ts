import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../services/orders/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderedItems = []
  deliveredAddress = []
  order: Order = new Order()
  private _orderService: OrdersService

  constructor(
    orderService: OrdersService
  ) { 
    this._orderService = orderService

  }

  ngOnInit() {
    this.getOrder()
  }

  getOrder() {
    this.order.order_id = 103
    console.log("Fetching order for:", this.order.order_id)
    this._orderService.getOrder(this.order.order_id)
    .then((data: any) => {
      console.log(data)
      this.orderedItems = data
    })
  }

}

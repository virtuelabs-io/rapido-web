import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../services/orders/order';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderedItems = []
  deliveredAddress = []
  _imageUrl: string = Constants.environment.staticAssets
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
    //  this.orderedItems = data
    for(var i = 0; i < data.length; i++) {
      this.orderedItems.push(
        {
          pic: this._imageUrl+data[i].itemDetails.images[0],
          title: data[i].itemDetails.name,
          createdOn: data[i].orderItem.created_on,
          productId: data[i].orderItem.product_id,
          currency: data[i].itemDetails.currency,
          orderId: data[i].orderItem.id,
          order_price: data[i].orderItem.order_price,
          order_status_id: data[i].orderItem.order_status_id,
          quantity: data[i].orderItem.quantity,
          unitPrice: data[i].orderItem.unit_price
        }
      )
    }
      
      this.deliveredAddress = data[0].orderItem
    })
  }

}

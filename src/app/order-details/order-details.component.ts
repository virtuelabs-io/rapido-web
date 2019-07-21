import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../services/orders/order';
import { Constants } from '../utils/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { parse } from 'url';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderedItems = []
  deliveredAddress = []
  currency: string 
  orderPrice: string
  createdOn: string
  orderId: string
  id: number
  _imageUrl: string = Constants.environment.staticAssets
  order: Order = new Order()
  private _orderService: OrdersService

  constructor(
    orderService: OrdersService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { 
    this._orderService = orderService

  }

  ngOnInit() {
    this.id = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.getOrder()
  }

  getOrder() {
    this.order.order_id = this.id
    console.log("Fetching order for:", this.order.order_id)
    this._orderService.getOrder(this.order.order_id)
    .then((data: any) => {
      console.log(data)
    for(var i = 0; i < data.length; i++) {
      this.orderedItems.push(
        {
          pic: this._imageUrl+data[i].itemDetails.images[0],
          title: data[i].itemDetails.name,
          createdOn: data[i].orderItem.created_on.split("T")[0],
          productId: data[i].orderItem.product_id,
          currency: data[i].itemDetails.currency,
          orderId: data[i].orderItem.id,
          order_price: data[i].orderItem.order_price,
          order_status_id: Constants.ORDER_STATUS[data[i].orderItem.order_status_id],
          quantity: data[i].orderItem.quantity,
          unitPrice: data[i].orderItem.unit_price
        }
      )
    }
    this.deliveredAddress = data[0].orderItem
    this.currency = this.orderedItems[0].currency
    this.orderPrice = data[0].orderItem.order_price
    this.createdOn = this.orderedItems[0].createdOn
    this.orderId = this.orderedItems[0].orderId
    })
  }

}

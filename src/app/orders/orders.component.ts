import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private _orderService: OrdersService
  _imageUrl: string = Constants.environment.staticAssets
  orders = []
  
  constructor(
    orderService: OrdersService
  ) { 
    this._orderService = orderService
  }

  ngOnInit() {
    this.getOrders()
  }

  uniqueOrders(arr, comp) {
    const unique = arr
       .map(e => e[comp])
     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);
   return unique;
  }

  getOrders(){
    this._orderService.getOrders()
    .then((data: any) => {
      for(var i = 0; i < data.length; i++) {
        this.orders.push({
          id: data[i].orderItem.id,
          date: data[i].orderItem.created_on.split("T")[0],
          price: data[i].orderItem.order_price,
          shipTo: data[i].orderItem.full_name,
          currency: data[i].itemDetails.currency,
          category: Constants.ORDER_STATUS[data[i].orderItem.order_status_id],
          items: []
        })
      }
      this.orders = this.uniqueOrders(this.orders, 'id')
      for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < this.orders.length; j++) {
          if(data[i].orderItem.id == this.orders[j].id) {
            this.orders[j].items.push({
              desc: data[i].itemDetails.name,
              unitPrice: data[i].orderItem.unit_price,
              pic: this._imageUrl+data[i].itemDetails.images[0],
              currency: data[i].itemDetails.currency
            })
          }
        }
      }
    })
  }
}

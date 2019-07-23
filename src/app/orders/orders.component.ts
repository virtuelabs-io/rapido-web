import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Constants } from '../utils/constants';
import { Order } from '../services/orders/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private _orderService: OrdersService
  imageUrl: string = Constants.environment.staticAssets
  orders = {}
  products = {}
  currentOrders = []
  cancelledStatus = Constants.ORDER_STATUS[4]

  constructor(
    orderService: OrdersService,
    private router: Router
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

  getOrders() {
    this._orderService.getOrders()
    .then((data: any) => {
      if(data['products']) {
        this.products = data['products']
      }
      if(data['orderItemsObject']) {
        for(let order in data['orderItemsObject']) {
          if(this.orders[order] == undefined) {
            this.orders[order] = {}
            this.orders[order]['items'] = []
          }
          for(let product in data['orderItemsObject'][order]){
            this.orders[order].currency = data['products'][product]['currency']
            this.orders[order].price = data['orderItemsObject'][order][product]['order_price']
            this.orders[order].date = data['orderItemsObject'][order][product]['created_on'].split('T')[0]
            this.orders[order].shipTo = data['orderItemsObject'][order][product]['full_name']
            this.orders[order].category = Constants.ORDER_STATUS[data['orderItemsObject'][order][product]['order_status_id']]
            this.orders[order]['items'].push(data['orderItemsObject'][order][product])
          }
        }
      }
      this.currentOrders = Object.keys(this.orders).reverse()
    })
  }

  cancelOrder(id) {
    this._orderService.cancelOrder(id)
    .subscribe(data => {
      this.getOrders()
    })
  }

  orderDetails(id) {
    this.router.navigate(['orders', id, 'details'])
  }
}

import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders/orders.service';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { RouteService } from '../shared-services/route/route.service';
import { LoginStateService } from '../shared-services/login-state/login-state.service';

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
  isLoggedIn: Boolean
  cancelledStatus = Constants.ORDER_STATUS[4]

  constructor(
    orderService: OrdersService,
    private router: Router,
    private RouteService : RouteService,
    private _loginStateService: LoginStateService
  ) {
    this._orderService = orderService
  }

  ngOnInit() {
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.getOrders()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('orders')
    this.router.navigateByUrl('/login')
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

  async getOrders() {
    this.currentOrders = []
    this.orders = {}
    if(this.isLoggedIn) {
      await this._orderService.getOrders()
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
            this.orders[order].product_id = data['orderItemsObject'][order][product]['product_id']
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
    else {
      await Promise.reject("Login Session doesn't exist!")
    }
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

import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Order } from '../../services/orders/order';
import { Constants } from '../../utils/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { CompanyDetailsService } from '../../services/customer/company-details.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  newOrder: boolean = false
  _previousRoute: any = ""
  orderedItems = []
  orders = {}
  products = {}
  currency: string 
  orderPrice: string
  createdOn: string
  orderId: string
  id: number
  isLoggedIn: Boolean
  imageUrl: string = Constants.environment.staticAssets
  companyDetails: {}
  showCompanyDetails: boolean = true
  order: Order = new Order()
  private _orderService: OrdersService
  private _companyDetailsService: CompanyDetailsService

  constructor(
    orderService: OrdersService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    companyDetailsService: CompanyDetailsService,
    private _cartStateService: CartStateService
  ) { 
    this._orderService = orderService
    this._companyDetailsService = companyDetailsService
    
  }

  ngOnInit() {
    this._previousRoute = this.RouteService.getRoute()
    if(this._previousRoute.value == 'orderCreated') {
      this.newOrder = true
    }
    this.id = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists().
		then( _ => this.getOrder()).
		catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
  }

  async handleError(err) {
    this.RouteService.changeRoute('orders/'+this.id+'/details')
    this.router.navigateByUrl('/login')
   }

  async getOrder() {
    this.order.order_id = this.id
    if(this.isLoggedIn) {
      this._loginStateService.loaderEnable()
      // to fetch the company details..
      this.getCompanyDetails()
      this._cartStateService.fetchAndUpdateCartCount()
      await this._orderService.getOrder(this.order.order_id)
    .then((data: any) => {
      if(data['orderItemsObject']) {
        for(let order in data['orderItemsObject']) {
          if(data['products']) {
            this.products = data['products']
          }
          if(this.orders[order] == undefined) {
            this.orders[order] = {}
            this.orders[order]['items'] = []
            this.orders[order]['address'] = {}
          }
          for(let product in data['orderItemsObject'][order]) {
            this.orders[order].currency = data['products'][product]['currency']
            this.orders[order].order_price = data['orderItemsObject'][order][product].order_price
            this.orders[order].date = data['orderItemsObject'][order][product]['created_on'].split('T')[0]
            this.orders[order].shipTo = data['orderItemsObject'][order][product]['full_name']
            this.orders[order].category = Constants.ORDER_STATUS[data['orderItemsObject'][order][product]['order_status_id']]
            this.orders[order].items.push(data['orderItemsObject'][order][product])

            this.orders[order]['address'].full_name = data['orderItemsObject'][order][product].full_name
            this.orders[order]['address'].addr_1 = data['orderItemsObject'][order][product].addr_1
            this.orders[order]['address'].addr_2 = data['orderItemsObject'][order][product].addr_2
            this.orders[order]['address'].city = data['orderItemsObject'][order][product].city
            this.orders[order]['address'].county = data['orderItemsObject'][order][product].county
            this.orders[order]['address'].postcode = data['orderItemsObject'][order][product].postcode
            this.orders[order]['address'].country = data['orderItemsObject'][order][product].country
          }
        }
        this.orderedItems = Object.keys(this.orders)
        this._loginStateService.loaderDisable()
      }
    })
    }
    else {
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  async getCompanyDetails() {
    if(this.isLoggedIn) {
      await this._companyDetailsService.getCompanyDetails()
      .subscribe(data => {
        if(data != null) {
          this.companyDetails = {
            name: data.company_name,
            add1: data.addr_1,
            add2: data.addr_2,
            town_city: data.city,
            postCode: data.postcode,
            country: data.country,
            county: data.county
          }
        }
        else {
          this.showCompanyDetails = false
        }
      })
    }
    else {
      await Promise.reject("Login Session doesn't exist!")
    }
  }
}
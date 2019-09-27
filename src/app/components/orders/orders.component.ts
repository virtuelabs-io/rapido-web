import { Component, OnInit, NgZone, NgModule } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Constants } from '../../utils/constants';
import { Router } from '@angular/router';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import {  MatDialog } from '@angular/material';
import { RatingsService } from '../../services/ratings/ratings.service';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		FormBuilder,
		Validators,
    FormGroup,
    ReactiveFormsModule
	]
})

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public _orderService: OrdersService
  imageUrl: string = Constants.environment.staticAssets
  orders = {}
  products = {}
  currentOrders = []
  dialogRef: any
  isLoggedIn: Boolean
  fetchOrdersRes: any
  cancelOrderRes: any
  cancelledStatus = Constants.ORDER_STATUS[4]
  incomplete = Constants.ORDER_STATUS[1]
  delivered = Constants.ORDER_STATUS[3]
  paid = Constants.ORDER_STATUS[2]
  public _ratingsService: RatingsService

  constructor(
    orderService: OrdersService,
    private router: Router,
    private RouteService : RouteService,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone,
    ratingsService: RatingsService,
    public dialog: MatDialog
  ) {
    this._orderService = orderService
    this._ratingsService = ratingsService
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
      this._loginStateService.loaderEnable()
      await this._orderService.getOrders()
    .then((data: any) => {
      this.fetchOrdersRes = data
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
            this.orders[order].price = data['orderItemsObject'][order][product]['order_price_total']
            this.orders[order].product_id = data['orderItemsObject'][order][product]['product_id']
            this.orders[order].date = data['orderItemsObject'][order][product]['created_on'].split('T')[0]
            this.orders[order].shipTo = data['orderItemsObject'][order][product]['full_name']
            this.orders[order].category = Constants.ORDER_STATUS[data['orderItemsObject'][order][product]['order_status_id']]
            this.orders[order]['items'].push(data['orderItemsObject'][order][product])
          }
        }
      }
      this.currentOrders = Object.keys(this.orders).reverse()
      this._loginStateService.loaderDisable()
    })
    }
    else {
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  cancelOrder(id) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Are you sure you want to cancel this order"
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.yesModalAction(id)
      }
    });
  }

  yesModalAction(id) {
    this._loginStateService.loaderEnable()
    this._orderService.cancelOrder(id)
    .subscribe(data => {
      this.cancelOrderRes = data
      this.getOrders()
    })
  }

  orderDetails(id) {
   this.ngZone.run(() =>this.router.navigate(['orders', id, 'details'])).then()
  }

  handleReview(productId) {
    this._loginStateService.loaderEnable()
    this._ratingsService.checkProductReview(productId)
    .subscribe(data => {
      this.handleReviewNavigation(data, productId)
    })
  }

  handleReviewNavigation(data, productId) {
    if(data.length){
      this._loginStateService.loaderDisable()
      this.ngZone.run(() =>this.router.navigate(['review/edit/review', data[0].id] )).then()
    }
    else {
      this._loginStateService.loaderDisable()
      this.ngZone.run(() =>this.router.navigate(['review/create/product', productId] )).then()
    }
  }
}

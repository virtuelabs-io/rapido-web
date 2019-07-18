import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ChargeService } from '../services/payment/charge.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Charge } from '../services/payment/charge';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { AddressDetailsService } from '../services/customer/address-details.service';
import { RouteService } from '../shared-services/route/route.service';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../services/orders/order';

@NgModule({
	imports: [
		FormBuilder,
		Validators,
		FormGroup
	]
})

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  _imageUrl: string = Constants.environment.staticAssets
  isLinear = false;
  orderItems = []
  stepperIndex: number = 0
  order: Order = new Order()
  showSpinner: Boolean = false
  address_details_id: number
  private _addressDetailsService: AddressDetailsService
  address: any
  example:any
  
  registerFormGroup: FormGroup // UI reactive Form Group variable 
  private _orderService: OrdersService

  constructor(
   // private fb: FormBuilder, // by Sangram
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private chargeService: ChargeService,
    private RouteService : RouteService,
    orderService: OrdersService,

    private router: Router,
    addressDetailsService: AddressDetailsService
  ) {
    this._addressDetailsService = addressDetailsService
    this._orderService = orderService
    this.showSpinner = true
    this.getAddressList()
  }

  ngOnInit() {
    this.showSpinner = true
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      if(data['length'] > 0) {
        this.address_details_id = data[0]['id']
        this.address = data
      }
      this.showSpinner = false
    })
  }

  newAddress() {
    this.RouteService.changeRoute('cart');
    this.router.navigate(['profile/address/newAddress']);
  }

  getAddressList() {
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      this.showSpinner = false
      if(data['length'] > 0) {
        this.address_details_id = data[0]['id']
        this.address = data
      }
      else if(data['length'] === 0) {
        this.address = data
      }
    })
  }

  createOrder(id) {
    console.log(id)
    this.order.delivery_address_id = id
    this._orderService.createOrder(this.order)
    .then((data: any) => {
      console.log(data)
      this.order.order_id = data[0]['orderItem']['id']

      for(var i = 0; i < data.length; i++) {
        this.orderItems.push({
          id: data[i].orderItem.product_id,
          pic: this._imageUrl+data[i].itemDetails.images[0],
          title: data[i].itemDetails.name,
          unitPrice: data[i].orderItem.unit_price,
          quantity: data[i].orderItem.quantity,
          orderPrice: data[i].orderItem.order_price
        })
      }

      this.stepperIndex = 1
    })
  }
}

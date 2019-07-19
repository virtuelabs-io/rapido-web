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
import { LoginStateService } from '../shared-services/login-state/login-state.service';
import { ProfileService } from '../services/authentication/profile/profile.service';

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
  registeredEmail: string = ""
  _logInName: string
  amount: any
  orderItems = []
  orderAddress = {
    addr_1: "",
    addr_2: "",
    address_type_id: "",
    city: "",
    country: "",
    postcode: "",
    county: "",
    delivery_address_id: "",
    full_name: ""
  }
  stepperIndex: number = 0
  order: Order = new Order()
  showSpinner: Boolean = false
  address_details_id: number
  private _addressDetailsService: AddressDetailsService
  address: any
  example:any
  payment: FormGroup;
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  elements: Elements;
  card: StripeElement;
  chargeResult: string;
  _charge: Charge = new Charge()

  registerFormGroup: FormGroup // UI reactive Form Group variable 
  private _orderService: OrdersService

  constructor(
   // private fb: FormBuilder, // by Sangram
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private chargeService: ChargeService,
    private RouteService : RouteService,
    orderService: OrdersService,
    private _loginStateService: LoginStateService,
    private _profileService: ProfileService,
    private fb: FormBuilder,
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

    this._loginStateService.currentState.subscribe(state => {
      if (state) {
        this.registeredEmail = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.email
        this._logInName = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      }
    })

    this.payment = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
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
          id: data[i].orderItem.id,
          pic: this._imageUrl+data[i].itemDetails.images[0],
          title: data[i].itemDetails.name,
          unitPrice: data[i].orderItem.unit_price.toFixed(2),
          quantity: data[i].orderItem.quantity,
          orderPrice: data[i].orderItem.order_price.toFixed(2)
        })
      }
      this.amount = data[0].orderItem.order_price.toFixed(2)
      this.orderAddress.addr_1 = data[0].orderItem.addr_1
      this.orderAddress.addr_2 = data[0].orderItem.addr_2
      this.orderAddress.address_type_id = data[0].orderItem.address_type_id
      this.orderAddress.city = data[0].orderItem.city
      this.orderAddress.country = data[0].orderItem.country
      this.orderAddress.county = data[0].orderItem.county
      this.orderAddress.delivery_address_id = data[0].orderItem.delivery_address_id
      this.orderAddress.full_name = data[0].orderItem.full_name
      this.orderAddress.postcode = data[0].orderItem.postcode
      this.stepperIndex = 1
    })
  }

  buy() {
    this._charge.name = this._logInName
    this._charge.amount = this.orderItems[0].orderPrice.fixed(2)
    this._charge.description = ['Rapidobuild Order',' #', this.orderItems[0].id].join("")
    this._charge.receiptEmail = this.registeredEmail
    this._charge.order_id = this.orderItems[0].id
    const name = this._charge.name
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          console.log(result.token);
          this._charge.token = result.token.id
          console.log(this._charge)
          this.charge(this._charge)
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }

  charge(charge: Charge) {
    const promise = this.chargeService.chargeCustomer(charge)
    .then(data => {
      console.log(data)
      this.chargeResult = JSON.stringify(data)
    })
  }
}

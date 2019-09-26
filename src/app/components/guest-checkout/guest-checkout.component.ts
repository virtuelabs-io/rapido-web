import { Component, OnInit, NgZone, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GuestAddressService } from '../../services/guests/guest-address.service';
import { GuestAddressDetails } from '../../services/guests/guest-address-details';
import { GuestOrder } from '../../services/guests/guest-order';
import { GuestOrdersService } from '../../services/guests/guest-orders.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { Constants } from '../../utils/constants';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { GuestChargeService } from '../../services/payment/guest-charge.service';
import { GuestCharge } from '../../services/payment/guest-charge';
import {MatSnackBar} from '@angular/material';
import { RouteService } from '../../shared-services/route/route.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/authentication/profile/profile.service';

@NgModule({
	imports: [
		FormBuilder,
		Validators,
		FormGroup
	]
})

@Component({
  selector: 'app-guest-checkout',
  templateUrl: './guest-checkout.component.html',
  styleUrls: ['./guest-checkout.component.scss']
})
export class GuestCheckoutComponent implements OnInit {
  _previousRoute: any = ""
  address_details_id: number
  name: string = ""
  addRes: any
  orders = {}
  products = []
  orderedDate: any
  itemTotal: any
  orderTotal: any
  deliveryCharges: any
  vatTotal: any
  currency: string 
  orderItems = []
  _orderId: any
  imageUrl: string = Constants.environment.staticAssets
  stepperIndex: number = 0
  registeredEmail: string = ""
  _logInName: string
  payment: FormGroup;
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  elements: Elements;
  card: StripeElement;
  chargeResult: string;
  _charge: GuestCharge = new GuestCharge()
  addressFormGroup: FormGroup // UI reactive Form Group variable
  private _guestAddressService: GuestAddressService
  private _guestOrderService: GuestOrdersService
  guestOrder: GuestOrder = new GuestOrder()

  constructor(
    guestAddressService: GuestAddressService,
    guestOrderService: GuestOrdersService,
    private _loginStateService: LoginStateService,
    private stripeService: StripeService,
    private guestChargeService: GuestChargeService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private RouteService : RouteService,
    private ngZone: NgZone,
    private _profileService: ProfileService
  ) { 
    this._guestAddressService = guestAddressService
    this._guestOrderService = guestOrderService
  }

  ngOnInit() {
    this.addressFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      add1: new FormControl('', [Validators.required]),
      add2: new FormControl('', [Validators.required]),
      town_city: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
      county: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required])
    })

    this._loginStateService.isLoggedInState.subscribe(state => {
      if (state) {
        this.registeredEmail = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.email
        this._logInName = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
      }
    })
    let d = new Date()
    this.orderedDate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
  }

  ngAfterViewInit() {
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

  async createGuestOrder(formData) {
    await this.postGuestAddressDetails(formData).
		then( _ => this.order())
  }

  async order(){
    await this._guestOrderService.createGuestOrder(this.guestOrder)
    .then((data: any) => {
      console.log('created guest order')
      console.log(data)
      
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
          this._orderId = order
          for(let product in data['orderItemsObject'][order]) {
           this.orders[order]['items'].push(data['orderItemsObject'][order][product])
            this.orders[order]['address'].full_name = data['orderItemsObject'][order][product].full_name
            this.orders[order]['address'].addr_1 = data['orderItemsObject'][order][product].addr_1
            this.orders[order]['address'].addr_2 = data['orderItemsObject'][order][product].addr_2
            this.orders[order]['address'].city = data['orderItemsObject'][order][product].city
            this.orders[order]['address'].county = data['orderItemsObject'][order][product].county
            this.orders[order]['address'].postcode = data['orderItemsObject'][order][product].postcode
            this.orders[order]['address'].country = data['orderItemsObject'][order][product].country
            this.itemTotal = data['orderItemsObject'][order][product].order_price.toFixed(2)
            this.vatTotal = data['orderItemsObject'][order][product].vat.toFixed(2)
            this.deliveryCharges = data['orderItemsObject'][order][product].delivery_cost.toFixed(2)
            this.orderTotal = data['orderItemsObject'][order][product].order_price_total.toFixed(2)
            this.currency = data['products'][product].currency
          }
        }
        this.orderItems = Object.keys(this.orders)
      }
      this._loginStateService.loaderDisable()
      this.stepperIndex = 1
    })
  }

  async postGuestAddressDetails(formData){
    let guestAddressDetails: GuestAddressDetails = new GuestAddressDetails(
      formData.name,
      1, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
      formData.add1,
      formData.town_city,
      formData.county,
      formData.country,
      formData.postCode,
      formData.mail,
      formData.mobileNumber,
      formData.add2
    )
    await this._guestAddressService.postGuestAddressDetails(guestAddressDetails)
    .subscribe(data => {
      console.log('created guest address')
      console.log(data)
      if(data['insertId']){
        this.address_details_id = data['insertId']
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
     // this.guest_result = "Sucessfully posted guest address details and logged!";
    })
  }

  public hasError = (controlName: string, errorName: string) => {
		return this.addressFormGroup.controls[controlName].hasError(errorName)
  }
  
  buy() {
    this._loginStateService.loaderEnable()
    this._charge.name = this._logInName
    this._charge.description = ['Rapidobuild Order',' #', this._orderId].join("")
    this._charge.receiptEmail = this.registeredEmail
    this._charge.order_id = this._orderId
    const name = this._charge.name
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this._charge.token = result.token.id
          this.charge(this._charge)
        } else if (result.error) {
          // error log
          this._loginStateService.loaderDisable()
          this._snackBar.open(result.error.message, "", {
            duration: 5000
          });
        }
      });
  }

  charge(charge: GuestCharge) {
    const promise = this.guestChargeService.chargeCustomer(charge)
    .then(data => {
      console.log('payment success')
      this.chargeResult = JSON.stringify(data)
      this._loginStateService.loaderDisable()
      this.stepperIndex = 2
    })
  }
}

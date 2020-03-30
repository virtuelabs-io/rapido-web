import { Component, OnInit, NgModule, NgZone } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ChargeService } from "../../services/payment/charge.service"
import {
  StripeService,
  Elements,
  Element as StripeElement,
  ElementsOptions,
} from "ngx-stripe"
import { Charge } from "../../services/payment/charge"
import { Constants } from "../../utils/constants"
import { Router } from "@angular/router"
import { AddressDetailsService } from "../../services/customer/address-details.service"
import { RouteService } from "../../shared-services/route/route.service"
import { OrdersService } from "../../services/orders/orders.service"
import { Order } from "../../services/orders/order"
import { LoginStateService } from "../../shared-services/login-state/login-state.service"
import { ProfileService } from "../../services/authentication/profile/profile.service"
import { MatSnackBar } from "@angular/material"

@NgModule({
  imports: [FormBuilder, Validators, FormGroup],
})
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  deliveryDateInterval = Constants.DELIVERY_DATE_INTERVAL
  imageUrl: string = Constants.environment.staticAssets
  _orderId: any
  isLinear = false
  registeredEmail: string = ""
  _logInName: string
  itemTotal: any
  orderTotal: any
  deliveryCharges: any
  vatTotal: any
  currency: string
  orderItems = []
  orders = {}
  isLoggedIn: Boolean
  products = []
  stepperIndex: number = 0
  order: Order = new Order()
  showSpinner: Boolean = false
  address_details_id: number
  private _addressDetailsService: AddressDetailsService
  address: any
  example: any
  payment: FormGroup
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: "en",
  }
  elements: Elements
  card: StripeElement
  chargeResult: string
  _charge: Charge = new Charge()

  registerFormGroup: FormGroup // UI reactive Form Group variable
  private _orderService: OrdersService
  disclaimerReq: Boolean
  constructor(
    private _formBuilder: FormBuilder,
    private stripeService: StripeService,
    private chargeService: ChargeService,
    private RouteService: RouteService,
    orderService: OrdersService,
    private _loginStateService: LoginStateService,
    private _profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    addressDetailsService: AddressDetailsService,
    private _snackBar: MatSnackBar,
    private ngZone: NgZone
  ) {
    this._addressDetailsService = addressDetailsService
    this._orderService = orderService
    this.showSpinner = true
    this.userLogInCheck()
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this._loginStateService.isLoggedInState.subscribe((state) => {
      if (state) {
        this.getAddressList()
        this.registeredEmail = this._profileService.cognitoUser
          .getSignInUserSession()
          .getIdToken().payload.email
        this._logInName = this._profileService.cognitoUser
          .getSignInUserSession()
          .getIdToken().payload.name
      } else {
        this._loginStateService.loaderDisable()
        this.ngZone.run(() => this.router.navigate([""])).then()
      }
    })
    this.payment = this.fb.group({
      name: ["", [Validators.required]],
    })
  }

  async userLogInCheck() {
    await this.loginSessinExists().then((_) => this.getAddressList())
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      (state) => (this.isLoggedIn = state)
    )
  }

  ngAfterViewInit() {
    this.stripeService.elements(this.elementsOptions).subscribe((elements) => {
      this.elements = elements
      // Only mount the element the first time
      if (!this.card) {
        this.card = this.elements.create("card", {
          style: {
            base: {
              color: "#32325d",
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: "antialiased",
              fontSize: "16px",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
        })
        this.card.mount("#card-element")
      }
    })
  }

  newAddress() {
    this.RouteService.changeRoute("cart")
    this.ngZone
      .run(() => this.router.navigate(["profile/address/newAddress"]))
      .then()
  }

  getAddressList() {
    this._loginStateService.loaderEnable()
    if (this.isLoggedIn) {
      this._addressDetailsService.getAddressDetailsList().subscribe((data) => {
        this.showSpinner = false
        if (data["length"] > 0) {
          this.address_details_id = data[0]["id"]
          this.address = data
        } else if (data["length"] === 0) {
          this.address = data
        }
        this._loginStateService.loaderDisable()
      })
    } else {
      this._loginStateService.loaderDisable()
      this.ngZone.run(() => this.router.navigate([""])).then()
    }
  }

  createOrder(id) {
    this._loginStateService.loaderEnable()
    this.order.delivery_address_id = id
    this._orderService.createOrder(this.order).then((data: any) => {
      if (data["orderItemsObject"]) {
        for (let order in data["orderItemsObject"]) {
          if (data["products"]) {
            this.products = data["products"]
          }
          if (this.orders[order] == undefined) {
            this.orders[order] = {}
            this.orders[order]["items"] = []
            this.orders[order]["address"] = {}
          }
          this._orderId = order
          for (let product in data["orderItemsObject"][order]) {
            this.orders[order]["items"].push(
              data["orderItemsObject"][order][product]
            )
            this.orders[order]["address"].full_name =
              data["orderItemsObject"][order][product].full_name
            this.orders[order]["address"].addr_1 =
              data["orderItemsObject"][order][product].addr_1
            this.orders[order]["address"].addr_2 =
              data["orderItemsObject"][order][product].addr_2
            this.orders[order]["address"].city =
              data["orderItemsObject"][order][product].city
            this.orders[order]["address"].county =
              data["orderItemsObject"][order][product].county
            this.orders[order]["address"].postcode =
              data["orderItemsObject"][order][product].postcode
            this.orders[order]["address"].country =
              data["orderItemsObject"][order][product].country
            this.itemTotal = data["orderItemsObject"][order][
              product
            ].order_price.toFixed(2)
            this.vatTotal = data["orderItemsObject"][order][
              product
            ].vat.toFixed(2)
            this.deliveryCharges = data["orderItemsObject"][order][
              product
            ].delivery_cost.toFixed(2)
            this.orderTotal = data["orderItemsObject"][order][
              product
            ].order_price_total.toFixed(2)
            this.currency = data["products"][product].currency
          }
        }
        this.orderItems = Object.keys(this.orders)
      }
      this._loginStateService.loaderDisable()
      this.stepperIndex = 1
    })
  }

  buy() {
    this._loginStateService.loaderEnable()
    this._charge.name = this._logInName
    this._charge.description = ["Rapidobuild Order", " #", this._orderId].join(
      ""
    )
    this._charge.receiptEmail = this.registeredEmail
    this._charge.order_id = this._orderId
    const name = this._charge.name
    this.stripeService.createToken(this.card, { name }).subscribe((result) => {
      if (result.token) {
        this._charge.token = result.token.id
        this.charge(this._charge)
      } else if (result.error) {
        // error log
        this._loginStateService.loaderDisable()
        this._snackBar.open(result.error.message, "", {
          duration: 5000,
        })
      }
    })
  }

  charge(charge: Charge) {
    const promise = this.chargeService.chargeCustomer(charge).then((data) => {
      this.chargeResult = JSON.stringify(data)
      this.RouteService.changeRoute("orderCreated")
      this._loginStateService.loaderDisable()
      this.ngZone
        .run(() =>
          this.router.navigate(["orders", this._charge.order_id, "details"])
        )
        .then()
    })
  }
}

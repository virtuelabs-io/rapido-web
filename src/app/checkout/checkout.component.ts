import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ChargeService } from '../services/payment/charge.service';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";
import { Charge } from '../services/payment/charge';
import { Constants } from '../utils/constants';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  chargeResult: string;

  _charge: Charge = new Charge()

  sample: string = "details"

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  payment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private chargeService: ChargeService
  ) {

  }

  ngOnInit() {
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

  customerNameUpdater(value: string) {
    this._charge.name = value
  }

  amountUpdater(value: number) {
    this._charge.amount = value
  }

  chargeDescriptionUpdater(value: string) {
    this._charge.description = value
  }

  orderIdUpdater(value: number) {
    this._charge.order_id = value
  }

  receiptEmailUpdater(value: string) {
    this._charge.receiptEmail = value
  }

  buy() {
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

  charge(charge: Charge){
    const promise = this.chargeService.chargeCustomer(charge)
    .then(data => {
      console.log(data)
      this.chargeResult = JSON.stringify(data)
    })
  }
}

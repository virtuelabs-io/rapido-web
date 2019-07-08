import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems = [
    {
      icon: "#shopping-bag",
      title: "Fossil Q Gen 4 Hr Gold Dial Men's Smart Watch-FTW4017",
      amount: "21,995.00",
      qunatity: "2"
    },
    {
      icon: "#shopping-bag",
      title: "Fossil Q Gen 4 Hr Gold Dial Men's Smart Watch-FTW4017",
      amount: "21,995.00",
      qunatity: "2"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}

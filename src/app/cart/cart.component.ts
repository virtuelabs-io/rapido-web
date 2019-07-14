import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  _imageUrl: string = Constants.environment.staticAssets
  cartItems = [
    
   /* {
      icon: "https://s3.eu-west-2.amazonaws.com/rapido-build-assets-bucket/images/products/1/image1.jpg",
      title: "ROMEX SUPER Youth Club Sir and Her Stunning Combo Analogue Black Dial Men and Women's Watch",
      amount: "21,995.00",
      qunatity: "2"
    },
    {
      icon: "#shopping-bag",
      title: "Fossil Q Gen 4 Hr Gold Dial Men's Smart Watch-FTW4017",
      amount: "21,995.00",
      qunatity: "1"
    },
    {
      icon: "#shopping-bag",
      title: "Macbook Pro 12-inch",
      amount: "21,995.00",
      qunatity: "1"
    } */
  ]

  private _cartService: CartService
  constructor(
    cartService: CartService
  ) { 
    this._cartService = cartService
  }

  ngOnInit() {
    this.getCartItems()
  }

  getCartItems() {
    this.cartItems = []
    this._cartService.getCartItems()
    .then((data: any) => {
      for(var i = 0; i < data.length; i++) {
        if(data[i].cartItem.in_cart) {
          this.cartItems.push(
            {
              id: data[i].cartItem.product_id,
              icon: this._imageUrl+data[i].itemDetails.images[0],
              title: data[i].itemDetails.name,
              amount: data[i].itemDetails.price,
              qunatity: data[i].cartItem.quantity
            } 
          )
        }
        
      }
      console.log(data)
    })
  }

  deleteCartItem(id) {
    this._cartService.deleteCartItem(id)
    .subscribe(data => {
      console.log(data)
      this.getCartItems()
    })
  } 
}

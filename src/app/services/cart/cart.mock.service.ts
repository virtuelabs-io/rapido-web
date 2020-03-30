import { Injectable } from "@angular/core"
import { RapidoHttpService } from "../commons/rapido-http.service"
import { HttpClient } from "@angular/common/http"
import { ProfileService } from "../authentication/profile/profile.service"
import { of } from "rxjs"
import { CartMockData } from "./cart.mock.data"
import { CartService } from "./cart.service"
import { ProductsService } from "../products/products.service"

@Injectable({
  providedIn: "root",
})
export class CartMockService extends CartService {
  public _productService: ProductsService

  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService,
    productService?: ProductsService
  ) {
    super(_http, _profileService)
    this._productService = productService
  }

  getCartItems() {
    return new Promise((resolve) => {
      resolve(CartMockData.getCartItems)
    })
  }

  getCountOfInCartItems() {
    return new Promise((resolve) => {
      resolve(CartMockData.cartCount)
    })
  }

  getSavedForLaterCartItems() {
    return new Promise((resolve) => {
      resolve(CartMockData.getSavedForLater)
    })
  }

  postCartItem() {
    return of(CartMockData.postCartItem)
  }

  postCartItemList() {
    return of(CartMockData.postCartItemList)
  }

  deleteCartItem() {
    return of(CartMockData.deleteCartItem)
  }
}

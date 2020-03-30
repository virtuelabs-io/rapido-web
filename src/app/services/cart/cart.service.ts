import { Injectable } from "@angular/core"
import { RapidoHttpService } from "../commons/rapido-http.service"
import { CartItem } from "./cart-item"
import { HttpClient } from "@angular/common/http"
import { ProfileService } from "../authentication/profile/profile.service"
import { Constants } from "../../utils/constants"
import { Query } from "../products/query.interface"
import { ProductsService } from "../products/products.service"
import { CartItemDetails } from "./cart-item-details"

@Injectable({
  providedIn: "root",
})
export class CartService extends RapidoHttpService<CartItem> {
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
      let cartItemsObject
      this.getList(
        [Constants.CART_APIS.api, "items"].join("/"),
        this.addAuthHeader(this.initializeHeaders())
      ).subscribe((data) => {
        if (data.length > 0) {
          cartItemsObject = this.formatCartItems(data)
          this.getProductDetails(data).subscribe((productDetails) => {
            resolve(
              this.prepareCartItemDetailsList(productDetails, cartItemsObject)
            )
          })
        } else {
          resolve({
            error: "No data found found for all items in cart(if they exist)",
          })
        }
      })
    })
  }

  getInCartItems() {
    return new Promise((resolve) => {
      let cartItemsObject
      this.getList(
        [Constants.CART_APIS.api, "in-cart-items"].join("/"),
        this.addAuthHeader(this.initializeHeaders())
      ).subscribe((data) => {
        if (data.length > 0) {
          cartItemsObject = this.formatCartItems(data)
          this.getProductDetails(data).subscribe((productDetails) => {
            resolve(
              this.prepareCartItemDetailsList(productDetails, cartItemsObject)
            )
          })
        } else {
          resolve({
            error: "No data found found for the items in cart(if they exist)",
          })
        }
      })
    })
  }

  getCountOfInCartItems() {
    return new Promise((resolve) => {
      this.getList(
        [Constants.CART_APIS.api, "in-cart-items"].join("/"),
        this.addAuthHeader(this.initializeHeaders())
      ).subscribe((data) => {
        resolve(data.length)
      })
    })
  }

  getSavedForLaterCartItems() {
    return new Promise((resolve) => {
      let cartItemsObject
      this.getList(
        [Constants.CART_APIS.api, "saved-for-later-items"].join("/"),
        this.addAuthHeader(this.initializeHeaders())
      ).subscribe((data) => {
        if (data.length > 0) {
          cartItemsObject = this.formatCartItems(data)
          this.getProductDetails(data).subscribe((productDetails) => {
            resolve(
              this.prepareCartItemDetailsList(productDetails, cartItemsObject)
            )
          })
        } else {
          resolve({
            error:
              "No data found found for the items saved for later (if they exist)",
          })
        }
      })
    })
  }

  postCartItem(cartItem: CartItem) {
    return this.post(
      [Constants.CART_APIS.api, "item"].join("/"),
      cartItem,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  postCartItemList(cartItems: CartItem[]) {
    return this.postList(
      [Constants.CART_APIS.api, "items"].join("/"),
      cartItems,
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  deleteCartItem(product_id: number) {
    return this.delete(
      [Constants.CART_APIS.api, "item", String(product_id)].join("/"),
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  deleteInCartItems() {
    return this.delete(
      [Constants.CART_APIS.api, "in-items"].join("/"),
      this.addAuthHeader(this.initializeHeaders())
    )
  }

  getProductDetails(cartItems: CartItem[]) {
    let _items: Array<String> = [Constants.SEARCH_QUERY.openBracketOr]
    for (let _item in cartItems) {
      _items.push(
        Constants.SEARCH_QUERY.term.replace(
          "$",
          String(cartItems[_item].product_id)
        )
      )
    }
    _items.push(Constants.SEARCH_QUERY.closeBracket)
    let _query: Query = {
      q: _items.join(" "),
      size: cartItems.length,
      cursor: null,
      return: Constants.SEARCH_QUERY.cartReturnFields,
      start: null,
      sort: null,
      qdotparser: Constants.SEARCH_QUERY.structuredParser,
    }
    return this._productService.get(_query)
  }

  formatCartItems(cartItems: CartItem[]) {
    let formatedData = {}
    for (let item in cartItems) {
      formatedData[cartItems[item].product_id] = cartItems[item]
    }
    return formatedData
  }

  prepareCartItemDetailsList(
    productDetails: any,
    cartItemsObject: any
  ): Array<CartItemDetails> {
    let cartItemDetailsList: CartItemDetails[] = []
    for (let product in productDetails.hits.hit) {
      cartItemDetailsList.push(
        new CartItemDetails(
          cartItemsObject[productDetails.hits.hit[product]["id"]],
          productDetails.hits.hit[product]["fields"]
        )
      )
    }
    return cartItemDetailsList
  }
}

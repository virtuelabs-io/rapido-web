import { Injectable } from '@angular/core'
import { RapidoHttpService } from '../commons/rapido-http.service'
import { GuestCartItem } from './guest-cart-item'
import { HttpClient } from '@angular/common/http'
import { ProfileService } from '../authentication/profile/profile.service'
import { Constants } from '../../utils/constants'
import { Query } from '../products/query.interface'
import { ProductsService } from '../products/products.service'
import { GuestCartItemDetails } from './guest-cart-item-details'

@Injectable({
  providedIn: 'root'
})
export class GuestCartService extends RapidoHttpService<GuestCartItem> {
  public _productService: ProductsService

  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService,
    productService?: ProductsService
  ) {
    super(_http, _profileService)
    this._productService = productService
  }

  getGuestCartItems() {
    return new Promise((resolve) => {
      let cartItemsObject
      this.getList(
        [
          Constants.GUESTS_APIS.api,
          localStorage.getItem(Constants.RAPIDO_SESSION_ID),
          'cart',
          'items'
        ].join('/')
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
            error: 'No data found found for all items in cart(if they exist)'
          })
        }
      })
    })
  }

  getCountOfGuestCartItems() {
    return new Promise((resolve) => {
      this.getList(
        [
          Constants.GUESTS_APIS.api,
          localStorage.getItem(Constants.RAPIDO_SESSION_ID),
          'cart',
          'items'
        ].join('/')
      ).subscribe((data) => {
        resolve(data.length)
      })
    })
  }

  postGuestCartItem(guestCartItem: GuestCartItem) {
    return this.post(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        'cart',
        'item'
      ].join('/'),
      guestCartItem
    )
  }

  postGuestCartItemList(guestCartItems: GuestCartItem[]) {
    return this.postList(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        'cart',
        'items'
      ].join('/'),
      guestCartItems
    )
  }

  deleteGuestCartItem(guestCartItem: GuestCartItem) {
    return this.put(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        'cart',
        'item'
      ].join('/'),
      guestCartItem
    )
  }

  deleteGuestCartItems() {
    return this.delete(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        'cart',
        'items'
      ].join('/')
    )
  }

  getProductDetails(cartItems: GuestCartItem[]) {
    let _items: Array<String> = [Constants.SEARCH_QUERY.openBracketOr]
    for (let _item in cartItems) {
      _items.push(
        Constants.SEARCH_QUERY.term.replace(
          '$',
          String(cartItems[_item].product_id)
        )
      )
    }
    _items.push(Constants.SEARCH_QUERY.closeBracket)
    let _query: Query = {
      q: _items.join(' '),
      size: cartItems.length,
      cursor: null,
      return: Constants.SEARCH_QUERY.cartReturnFields,
      start: null,
      sort: null,
      qdotparser: Constants.SEARCH_QUERY.structuredParser
    }
    return this._productService.get(_query)
  }

  formatCartItems(cartItems: GuestCartItem[]) {
    let formatedData = {}
    for (let item in cartItems) {
      formatedData[cartItems[item].product_id] = cartItems[item]
    }
    return formatedData
  }

  prepareCartItemDetailsList(
    productDetails: any,
    cartItemsObject: any
  ): Array<GuestCartItemDetails> {
    let cartItemDetailsList: GuestCartItemDetails[] = []
    for (let product in productDetails.hits.hit) {
      cartItemDetailsList.push(
        new GuestCartItemDetails(
          cartItemsObject[productDetails.hits.hit[product]['id']],
          productDetails.hits.hit[product]['fields']
        )
      )
    }
    return cartItemDetailsList
  }
}

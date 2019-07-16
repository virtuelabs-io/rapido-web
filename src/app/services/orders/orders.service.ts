import { Injectable } from '@angular/core';
import { Order } from './order';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';
import { Query } from '../products/query.interface';
import { ProductsService } from '../products/products.service';
import { OrderItemDetails } from './order-item-details';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends RapidoHttpService<Order> {

  private _productService: ProductsService

  constructor(protected _http: HttpClient, protected _profileService: ProfileService, productService: ProductsService) {
    super(_http, _profileService)
    this._productService = productService
  }

  createOrder(order: Order) {
    return new Promise(resolve=>{
      let orderItemsObject;
      this.post([Constants.ORDERS_APIS.api, 'orders'].join("/"), order, this.addAuthHeader(this.initializeHeaders()))
        .subscribe(data => {
          if (data[0].length > 0){
            orderItemsObject = this.formatOrderItems(data[0])
            this.getProductDetails(data[0])
              .subscribe(productDetails => {
                resolve(this.prepareCartItemDetailsList(
                  productDetails,
                  orderItemsObject
                ))
              })
          } else {
            resolve ({ error: "Error creating an order! Try again!" })
          }
        })
    });
  }

  confirmOrder(order: Order) {
    return new Promise(resolve=>{
      let orderItemsObject;
      this.put([Constants.ORDERS_APIS.api, 'orders', String(order.order_id)].join("/"), order, this.addAuthHeader(this.initializeHeaders()))
        .subscribe(data => {
          if (data[0].length > 0){
            orderItemsObject = this.formatOrderItems(data[0])
            this.getProductDetails(data[0])
              .subscribe(productDetails => {
                resolve(this.prepareCartItemDetailsList(
                  productDetails,
                  orderItemsObject
                ))
              })
          } else {
            resolve ({ error: "Error confirming your order! Try again!" })
          }
        })
    });
  }

  getOrder(order_id: number) {
    return new Promise(resolve=>{
      let orderItemsObject;
      this.get([Constants.ORDERS_APIS.api, 'orders', String(order_id)].join("/"), this.addAuthHeader(this.initializeHeaders()))
        .subscribe(data => {
          if (data[0].length > 0){
            orderItemsObject = this.formatOrderItems(data[0])
            this.getProductDetails(data[0])
              .subscribe(productDetails => {
                resolve(this.prepareCartItemDetailsList(
                  productDetails,
                  orderItemsObject
                ))
              })
          } else {
            resolve ({ error: "Error fetchinng your order! Try again!" })
          }
        })
    });
  }

  getOrders() {
    return new Promise(resolve=>{
      let orderItemsObject;
      this.get([Constants.ORDERS_APIS.api, 'orders'].join("/"), this.addAuthHeader(this.initializeHeaders()))
        .subscribe(data => {
          if (data[0].length > 0){
            orderItemsObject = this.formatOrderItems(data[0])
            this.getProductDetails(data[0])
              .subscribe(productDetails => {
                resolve(this.prepareCartItemDetailsList(
                  productDetails,
                  orderItemsObject
                ))
              })
          } else {
            resolve ({ error: "Error fetchinng your orders! Try again!" })
          }
        })
    });
  }

  cancelOrder(order_id: number){
    return this.delete([Constants.ORDERS_APIS.api, 'orders', String(order_id)].join("/"),this.addAuthHeader(this.initializeHeaders()))
  }

  getProductDetails(orderItems: any){
    let _items: Array<String> = [Constants.SEARCH_QUERY.openBracketOr]
    for(let _item in orderItems){
      _items.push(Constants.SEARCH_QUERY.term.replace("$", String(orderItems[_item].product_id)))
    }
    _items.push(Constants.SEARCH_QUERY.closeBracket)
    let _query: Query = {
      q: _items.join(" "),
      size: orderItems.length,
      cursor: null,
      return: Constants.SEARCH_QUERY.orderReturnFields,
      start: null,
      sort: null,
      qdotparser: Constants.SEARCH_QUERY.structuredParser
    }
    return this._productService.get(_query)
  }

  formatOrderItems(orderItems: any) {
    let formatedData = {}
    for(let item in orderItems){
      formatedData[orderItems[item].product_id] = orderItems[item]
    }
    return formatedData
  }

  prepareCartItemDetailsList(productDetails: any, orderItemsObject: any): Array<OrderItemDetails> {
    let orderItemDetailsList: OrderItemDetails[] = []
    for(let product in productDetails.hits.hit){
      orderItemDetailsList.push(new OrderItemDetails(
        orderItemsObject[productDetails.hits.hit[product]["id"]],
        productDetails.hits.hit[product]["fields"]
      ))
    }
    return orderItemDetailsList
  }
}
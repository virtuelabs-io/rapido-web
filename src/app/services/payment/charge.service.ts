import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { Charge } from './charge';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';
import { Query } from '../products/query.interface';
import { ProductsService } from '../products/products.service';
import { LoginStateService } from 'src/app/shared-services/login-state/login-state.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends RapidoHttpService<Charge> {

  private _productService: ProductsService

  constructor(protected _http: HttpClient, 
    protected _profileService: ProfileService, 
    productService: ProductsService,
    protected _loginStateService: LoginStateService) {
    super(_http, _profileService, _loginStateService)
    this._productService = productService
  }

  chargeCustomer(charge: Charge){
    return new Promise(resolve=>{
      let orderItemsObject;
      this.post([Constants.PAYMENT_APIS.api,"charge"].join("/"), charge, this.addAuthHeader(this.initializeHeaders()))
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
      if(formatedData[orderItems[item].id] == undefined){
        formatedData[orderItems[item].id] = {}
      }
      formatedData[orderItems[item].id][orderItems[item].product_id] = orderItems[item]
    }
    return formatedData
  }

  prepareCartItemDetailsList(productDetails: any, orderItemsObject: any) {
    return {
      orderItemsObject, productDetails
    }
  }
}

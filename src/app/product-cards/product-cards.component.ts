import { Component, OnInit } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import { Query } from '../services/products/query.interface';


@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss']
})
export class ProductCardsComponent implements OnInit {

  private _productsService: ProductsService
  searchedText: string = ""
  _query: Query
  responseData: Object
  productList: Array<{id: number, fields: Object}>;
  constructor(private _searchItemService: SearchItemService,
              productsService: ProductsService) { 
                this._productsService = productsService
              }

  ngOnInit() {
    this._searchItemService.currentState.subscribe(state => {
      if (state) {
        this.searchedText = state
        this._query = {
          q: this.searchedText,
          size: 1,
          cursor: null, // always use either cursor or start, but not both
          start: null, // always use either cursor or start, but not both
          sort: null
        }
        this._productsService.get(this._query)
          .subscribe(data => {
            if(data)
            this.responseData = data
            if(data && data.hits && data.hits.hit)
            this.productList = data.hits.hit
          })
      }
    })

    // personalizePayload = () => {

    // }
  }

}

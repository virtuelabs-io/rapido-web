import { Component, OnInit } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import { Query } from '../services/products/query.interface';


@Component({
  selector: 'app-productresults',
  templateUrl: './ProductResults.component.html',
  styleUrls: ['./ProductResults.component.scss']
})
export class ProductResultsComponent implements OnInit {

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
          size: 10,
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
            for(let i=1; i<15; i++){
              this.productList.push(data.hits.hit[0])
            }
          })
      }
    })

    // personalizePayload = () => {

    // }
  }

}

import { Component, OnInit } from '@angular/core';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-productresults',
  templateUrl: './ProductResults.component.html',
  styleUrls: ['./ProductResults.component.scss']
})
export class ProductResultsComponent implements OnInit {

  private _productsService: ProductsService
  searchedText: string = ""
  responseData: Object
  productList: Array<{id: number, fields: Object}>;
  constructor(private _searchItemService: SearchItemService,
              productsService: ProductsService) { 
                this._productsService = productsService
              }

  ngOnInit() {
    this._searchItemService.currentState.subscribe(query => {
      if (query.q){
        this.searchedText = query.q
        this._productsService.get(query).
         subscribe(data => {
            if(data){
              if(data.error){
                throw Error('error')
              }
              this.responseData = data
              if(data && data.hits && data.hits.hit)
              this.productList = data.hits.hit
              for(let i=1; i<15; i++){
                this.productList.push(data.hits.hit[0])
              }
            }
            
       })
      }
      
      })
    }
  }


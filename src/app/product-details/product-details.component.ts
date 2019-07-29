import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { ProductsService } from '../services/products/products.service';
import { Common } from '../../../src/app/utils/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private _productsService: ProductsService
  itemDetails: any
  imagePreviewURI: any
  imageDetails: any
  itemId: any
  mrpPrice: any
  constructor(productsService: ProductsService,
    private _searchItemService: SearchItemService,
    private route: ActivatedRoute) { 
      this._productsService = productsService
    }

    ngOnInit() {

    // get current product id
     this.route.params.subscribe(params => {
      this.itemId = params.id; 
    });

    // get product details
    if(this.itemId){
      this._searchItemService.responsePoductListState.subscribe(respData => {
      let { hits } = respData
      if(hits && hits.hit ){
        let product = hits.hit.filter((val) => {
          return val.id == this.itemId
        })
        if(product[0].id){
          this.itemDetails = product[0].fields
          this.imageDetails = Common.getImageURI(this.itemDetails.images, null)
          this.imagePreviewURI = this.imageDetails[0]
          this.imageDetails = this.setImageValue()
          this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)
        }else{
          /* this._productsService.get(query).
         subscribe(data => {
            if(data){
              if(data.error){
                throw Error('error')
              }
              if(data.hits.found === 0){
                return;
              }
              product = data;
            }
       }) */
        }
        
      }
    })
    }
    
    
  }

  setImageValue(index=0){
    return this.imageDetails.map((val,key)=> {
      let thumbnailSel= false
        if(index === key){
          thumbnailSel= true
        }
    return ({
        active: thumbnailSel,
        uri: val
      })
    })
  }

  showPicture(uri, index){
    this.setImageValue(index)
    this.imagePreviewURI = uri
  }

}

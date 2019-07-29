import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { Common } from '../../../src/app/utils/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  itemDetails: any
  imagePreviewURI: any
  imageDetails:Object
  itemId: any
  mrpPrice: any
  constructor(private _searchItemService: SearchItemService,
    private route: ActivatedRoute) { }

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
        this.itemDetails = hits.hit.filter((val,key) => {
          return val.id == this.itemId
        })
        this.itemDetails = this.itemDetails[0].fields
        this.itemDetails.images = Common.getImageURI(this.itemDetails.images, null)
        this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)
      }
    })
    }
    
    
  }

  setImageValue(index=0){
    this.imageDetails = this.itemDetails.images.map((val,key)=>{
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

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  itemDetails: any
  itemId: any
  mrpPrice: any
  constructor(private _searchItemService: SearchItemService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemId = this.getItemId()
    console.log(this.itemId)
    if(this.itemId){
      this._searchItemService.responsePoductListState.subscribe(respData => {
      let { hits } = respData
      if(hits && hits.hit ){
        this.itemDetails = hits.hit.filter((val,key) => {
          return val.id == this.itemId
        })
        this.itemDetails = this.itemDetails[0].fields
        this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)

      }
    })
    }
    
  }

  getItemId(){
    return this.route.params.getValue('id').id
  }

}

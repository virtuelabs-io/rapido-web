import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SearchItemService } from '../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  itemDetails: any
  itemId: any
  constructor(private _searchItemService: SearchItemService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.itemId = this.getItemId()

    this._searchItemService.responsePoductListState.subscribe(respData => {
      debugger
      let { hits } = respData
      if(hits && hits.hit ){
        this.itemDetails = hits.hit[this.itemId].fields
      }
    })
  }

  getItemId(){

    return this.route.params.getValue('id').id
  }

}

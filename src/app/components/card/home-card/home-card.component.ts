import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItemService } from '../../../shared-services/search-item/search-item.services';
import { Common } from '../../../utils/common';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  @Input()  cardDetails = {
    title: "",
    image: "",
    desc: ""
  }
  constructor(
    private router: Router,
    private _searchItemService: SearchItemService
  ) { }

  ngOnInit() {
  }

  cardClick(searchedText) {
    let qObject = Common.searchProducts(searchedText)
    if(qObject){
      this.router.navigate(['/products'], { queryParams: qObject })
    }
  }
}

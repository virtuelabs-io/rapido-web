import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';

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
    if(searchedText) {
      this.router.navigateByUrl('/products')
      this._searchItemService.changeState({
      q: searchedText,
      searchedText: searchedText,
      start: 0,
      sort: null,
      cursor: null,
      return: null,
      qdotparser:null
      })
    }
  }
}

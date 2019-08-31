import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItemService } from '../../../shared-services/search-item/search-item.services';

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
    if(searchedText){
      let fieldsQuery = {
        price: {
          q: null,
          text: null
        },
        rating: {
          q: null,
          text: null
        }
      }
      let qObject = {
        q: searchedText,
        searchedText: searchedText,
        releatedSearch: null,
        fieldsQuery: JSON.stringify(fieldsQuery),
        size: 15,
        cursor: null,
        return: null,
        start: 0,
        sort: null,
        parser:'structured',
        qdotparser:null
      }
      this.router.navigate(['/products'], { queryParams: { search: JSON.stringify(qObject) } })
    }
  }
}

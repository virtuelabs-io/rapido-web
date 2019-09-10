import { Component, OnInit, Input } from '@angular/core';
import { RatingsService } from '../services/ratings/ratings.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnInit {
  @Input()  filteredReview = [{
    rating: "",
    title: "",
    date: "",
    summary: "",
    helpful: "",
    id: ""
  }]
  private _ratingsService: RatingsService
  constructor(
    ratingsService: RatingsService
  ) { 
    this._ratingsService = ratingsService
  }

  ngOnInit() {
  }

  helpfulRatingIncrement(id) {
    let id2 = id
    this._ratingsService.helpfulRatingIncrement(id)
    .subscribe(data => {
      console.log(id2)
    //  this.filteredReview[id2].helpful += 1
      console.log(data)


      this.filteredReview.map((v, i)=>{
        if(v.id == id2){
        console.log(id2, v.id, this.filteredReview[i].helpful)
        this.filteredReview[i].helpful += 1
        }
      })
    })
  }

}

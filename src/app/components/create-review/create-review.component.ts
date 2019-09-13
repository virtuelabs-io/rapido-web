import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  _productId: number = 0
  rate = 0
  image: any
  title: string
  constructor(
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._productId = this.actRoute.snapshot.queryParams.id
    this.image = this.actRoute.snapshot.queryParams.image
    this.title = this.actRoute.snapshot.queryParams.title
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  _productId: number = 0
  constructor(
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._productId = parseInt(this.actRoute.snapshot.paramMap.get('id'))
  }

}

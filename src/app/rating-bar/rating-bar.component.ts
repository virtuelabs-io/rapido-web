import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {
  @Input()  rate = []

  @Input()  reviewCount = 0
  constructor() { }

  ngOnInit() {
    if(this.rate) {
      this.calculate(this.rate)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.rate) {
      this.calculate(this.rate)
    }
  }

  calculate(rate) {
    for(var i = 0; i < rate.length; i++) {
      this.rate[i].count = (this.rate[i].count/this.reviewCount)*100
    }
  }

}

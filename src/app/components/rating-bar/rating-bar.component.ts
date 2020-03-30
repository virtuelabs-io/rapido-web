import { Component, OnInit, Input, SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {
  @Input() rate = []
  @Input() reviewCount = 0
  constructor() {}

  ngOnInit() {
    if (this.rate) {
      this.calculate()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.rate) {
      this.calculate()
    }
  }

  calculate() {
    this.rate.map((v, i) => {
      this.rate[i].percent = (v.count / this.reviewCount) * 100
    })
  }
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel-scroll',
  templateUrl: './carousel-scroll.component.html',
  styleUrls: ['./carousel-scroll.component.scss']
})
export class CarouselScrollComponent implements OnInit {
  @Input() carouselCard = [];
  @Input() carouselTitle = '';
  @Input() CarouselConfig = {};
  carouselData: any;
  constructor() {}

  ngOnInit() {
    this.carouselData = this.carouselCard;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.carouselData = this.carouselCard;
  }

  handleMrpRate(price, offer) {
    return (price * (1 + parseFloat(offer))).toFixed(2);
  }
}

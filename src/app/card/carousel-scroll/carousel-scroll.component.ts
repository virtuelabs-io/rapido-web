import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-scroll',
  templateUrl: './carousel-scroll.component.html',
  styleUrls: ['./carousel-scroll.component.scss']
})

export class CarouselScrollComponent implements OnInit {
  @Input() carouselCard
  @Input() CarouselConfig
  carouselData: any
  config: any
  constructor() { }

  ngOnInit() {
    this.config = this.CarouselConfig
    this.carouselData = this.carouselCard
  }
}

import { Component,Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel-scroll',
  templateUrl: './carousel-scroll.component.html',
  styleUrls: ['./carousel-scroll.component.scss']
})

export class CarouselScrollComponent implements OnInit {
  @Input() carouselCard = {
    title: "",
    data: []
  }
  @Input() CarouselConfig = {}
  carouselData: any
  constructor() { }

  ngOnInit() {
    this.carouselData = this.carouselCard
  }

  ngOnChanges(changes: SimpleChanges) {
    this.carouselData = this.carouselCard
  }
}

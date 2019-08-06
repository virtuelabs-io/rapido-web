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
    this.carouselData = this.carouselCard.data
  }

  formatData(data: any[], itemsInTemplate: number) {
    let formatedData = []
    let tmpItems = []
    data.forEach(item => {
      tmpItems.push(item)
      if(tmpItems.length === itemsInTemplate){
        formatedData.push(tmpItems)
        tmpItems = []
      }
    })
    if(tmpItems.length > 0){
      formatedData.push(tmpItems)
      tmpItems = []
    }
    return formatedData
  }
}

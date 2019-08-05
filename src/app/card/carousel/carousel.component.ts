import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() carouselCard
  @Input() CarouselConfig
  @Input() carouselTitle
  carouselData: any
  constructor() { }

  ngOnInit() {
    this.carouselData = this.formatData(this.carouselCard, this.CarouselConfig.itemsInTemplate)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.carouselData = this.formatData(this.carouselCard, this.CarouselConfig.itemsInTemplate)
  }

  formatData(data: any[], itemsInTemplate: number) {
    let formatedData = []
    let tmpItems = []
    if(data) {
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
    }
    return formatedData
  }
}

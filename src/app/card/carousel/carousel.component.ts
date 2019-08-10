import { Component, Input, OnInit, SimpleChanges, Directive } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  @Input() carouselCard = []
  @Input() carouselConfig = {}
  @Input() carouselTitle = ""
  carouselData: any
  config: any
  constructor() { }

  ngOnInit() {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)
  }

  formatData(data: any[], itemsInTemplate: number) {
    let formatedData = []
    let tmpItems = []
    if(data) {
      data.forEach(item => {
        item.mrpPrice = (item.price * (1 + parseFloat(item.offer))).toFixed(2)
        item.discountedPrice = (item.mrpPrice - item.price).toFixed(2)
        item.price = Number(item.price).toFixed(2)
        
        tmpItems.push(item)
        if(tmpItems.length === itemsInTemplate) {
          formatedData.push(tmpItems)
          
          tmpItems = []
        }
      })
      if(tmpItems.length > 0) {
        formatedData.push(tmpItems)
        tmpItems = []
      }
    }
    return formatedData
  }
}

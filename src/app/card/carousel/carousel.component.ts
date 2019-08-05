import { Component, Input, OnInit, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() carouselCard
  @Input() CarouselConfig
  carouselData: any
  config: any
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  

  ngOnInit() {
    this.config = this.CarouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    this.config = this.CarouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)


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

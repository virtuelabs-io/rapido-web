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
    /*this.scroll = [
      {
        "image": '/assets/images/home_card_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_2.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_3.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_4.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/home_card_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_2.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_3.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_4.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/home_card_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_1.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_2.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_3.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      },
      {
        "image": '/assets/images/aboutUs_4.jpg',
        "price": '₹ 359.00 to ₹ 5,319.00'
      }
    ]*/
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

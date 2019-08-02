import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-scroll',
  templateUrl: './carousel-scroll.component.html',
  styleUrls: ['./carousel-scroll.component.scss']
})
export class CarouselScrollComponent implements OnInit {
  scroll: any
  constructor() { }

  ngOnInit() {
    this.scroll = [
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
    ]
  }

}

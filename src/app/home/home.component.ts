import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardDetails: any
  carousel: any
  constructor() { }

  ngOnInit() {
    this.cardDetails = [
      {
        "title": "Fashion photography store",
        "image": '/assets/images/home_card_1.jpg',
        "desc": "Find the best photography deals",
        "price": "Rs. 100000"
      },
      {
        "title": "Crazy Constructions",
        "image": '/assets/images/aboutUs_1.jpg',
        "desc": "Find tools related to construction"
      },
      {
        "title": "Farmer's place",
        "image": '/assets/images/aboutUs_2.jpg',
        "desc": "Find the best deals here"
      },
      {
        "title": "We make it possible",
        "image": '/assets/images/aboutUs_3.jpg',
        "desc": "Deals you might be interested in"
      }
    ]

    this.carousel = [
      {
        "image": '/assets/images/home_card_1.jpg'
      },
      {
        "image": '/assets/images/aboutUs_1.jpg'
      },
      {
        "image": '/assets/images/aboutUs_2.jpg'
      },
      {
        "image": '/assets/images/aboutUs_3.jpg'
      },
      {
        "image": '/assets/images/aboutUs_4.jpg'
      },
      {
        "image": '/assets/images/aboutUs_4.jpg'
      },
      {
        "image": '/assets/images/aboutUs_3.jpg'
      },
      {
        "image": '/assets/images/aboutUs_2.jpg'
      },
      {
        "image": '/assets/images/aboutUs_1.jpg'
      },
      {
        "image": '/assets/images/home_card_1.jpg'
      }
    ]
  }

}

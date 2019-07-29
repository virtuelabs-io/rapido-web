import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardDetails: any
  constructor() { }

  ngOnInit() {
    this.cardDetails = [
      {
        "title": "Fashion photography store 1",
        "image": '/assets/images/home_card_1.jpg',
        "desc": "find the best photography deals",
        "price": 100000
      },
      {
        "title": "Fashion photography store 2",
        "image": '/assets/images/home_card_1.jpg',
        "desc": "find the best photography deals"
      },
      {
        "title": "Fashion photography store 3",
        "image": '/assets/images/home_card_1.jpg',
        "desc": "find the best photography deals"
      },
      {
        "title": "Fashion photography store 4",
        "image": '/assets/images/home_card_1.jpg',
        "desc": "find the best photography deals"
      }
    ]
  }

}

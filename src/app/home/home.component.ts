import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cardDetails: any
  carousel: any
  desktopConfig: any
  tabletConfig: any
  mobileConfig: any
  scroll: any
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
    this.desktopConfig = {
      image: true,
      price: true,
      itemsInTemplate: 5,
      scroll: true,
      title: true,
      offer: true,
      desc: true
    }
    this.tabletConfig = {
      image: true,
      price: true,
      itemsInTemplate: 3,
      scroll: true,
      title: true,
      offer: true,
      desc: true
    }
    this.mobileConfig = {
      image: true,
      price: true,
      itemsInTemplate: 1,
      scroll: true,
      title: true,
      offer: true,
      desc: true
    }
    this.carousel = {
      RecommendedList:  {
        "title": "Recommended Products",
        "data": [
          {
            "image": '/assets/images/home_card_1.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00',
            "offer": "10%",
            "desc": "Fossil Watch"
          },
          {
            "image": '/assets/images/aboutUs_1.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00',
            "offer": "10%",
            "desc": "Fossil Watch"
          },
          {
            "image": '/assets/images/aboutUs_2.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00',
            "offer": "10%",
            "desc": "Fossil Watch"
          },
          {
            "image": '/assets/images/aboutUs_3.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00',
            "offer": "10%",
            "desc": "Fossil Watch"
          },
          {
            "image": '/assets/images/aboutUs_4.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_4.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_3.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_2.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_1.jpg'
            
          },
          {
            "image": '/assets/images/home_card_1.jpg'
            
          },
          {
            "image": '/assets/images/aboutUs_4.jpg',
            "price": 'test price 1'
          },
          {
            "image": '/assets/images/aboutUs_3.jpg',
            "price": 'test price 2'
          }
        ]
      },


      BrowsingHistory:  {
        "title": "Previously Browsed Products",
        "data": [
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
            "image": '/assets/images/aboutUs_4.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_3.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_2.jpg',
            "price": '₹ 359.00 to ₹ 5,319.00'
          },
          {
            "image": '/assets/images/aboutUs_1.jpg'
            
          },
          {
            "image": '/assets/images/home_card_1.jpg'
            
          },
          {
            "image": '/assets/images/aboutUs_4.jpg',
            "price": 'test price 1'
          },
          {
            "image": '/assets/images/aboutUs_3.jpg',
            "price": 'test price 2'
          }
        ]
      }
        
      
      
      
    }
    
    

    
  }

}

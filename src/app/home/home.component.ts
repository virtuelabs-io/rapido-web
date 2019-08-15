import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { Common } from '../../../src/app/utils/common';
import { Constants } from '../../app/utils/constants'
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
  bannerCard: any
  banner: string
  scroll: any

  private _productsService: ProductsService
  constructor(
    productsService: ProductsService
  ) { 
    this._productsService = productsService
  }

   ngOnInit() {
    this.carousel = {
      RecommendedList:  {
        "title": "Recommended Products",
        "data": []
      },
      RecommendedSet:  {
        "title": "Recommended for You",
        "data": []
      },
      BrowsingHistory:  {
        "title": "Previously Browsed Products",
        "data": []
      }
    }

    this.banner = "assets/images/aboutUs_1.jpg"
    this.cardDetails = [
      {
        "title": "Watches",
        "image": '/assets/images/Watches.jpeg',
        "desc": "Find the best photography deals"
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

    this.bannerCard = [
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
      
    ]
    this.desktopConfig = Constants.DESKTOP_CONFIG
    this.tabletConfig = Constants.TABLET_CONFIG
    this.mobileConfig = Constants.MOBILE_CONFIG
     this.recommendedProductList()
     this.recommendedSet()
     this.browsedHistory()
  }

  recommendedProductList() {
    let query = {
      q: `watches`,
      size: 10
    }
     this._productsService.get(query).
    subscribe(data => {
      if (data) {
        this.carousel.RecommendedList.data = data.hits.hit.map((v,i)=>{
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
          })
        if (data.error) {
          throw Error('error')
        }
        if (data.hits.found === 0) {
          return;
        }
      }
    })
  }

  recommendedSet() {
    let query = {
      q: `watches`,
      size: 10
    }
     this._productsService.get(query).
    subscribe(data => {
      if (data) {
        this.carousel.RecommendedSet.data = data.hits.hit.map((v,i)=>{
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
          })
        if (data.error) {
          throw Error('error')
        }
        if (data.hits.found === 0) {
          return;
        }
      }
    })
  }

  browsedHistory() {
    let query = {
      q: `watches`,
      size: 10
    }
     this._productsService.get(query).
    subscribe(data => {
      if (data) {
        this.carousel.BrowsingHistory.data = data.hits.hit.map((v,i)=>{
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[1])
          return v.fields
          })
        if (data.error) {
          throw Error('error')
        }
        if (data.hits.found === 0) {
          return;
        }
      }
    })
  }
}
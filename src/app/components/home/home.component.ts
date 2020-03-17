import { Component, OnInit, NgZone } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Common } from '../../../../src/app/utils/common';
import { Constants } from '../../../app/utils/constants'
import { Router } from '@angular/router';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;  
  cardDetails: any
  carousel: any
  desktopConfig: any
  tabletConfig: any
  mobileConfig: any
  bannerCard: any
  banner: string
  scroll: any
  productCategories = []

  private _productsService: ProductsService
  constructor(
    productsService: ProductsService,
    private router: Router,
    private _searchItemService: SearchItemService,
    private ngZone: NgZone
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
      },
      newAddedProductSet:  {
        "title": "Newly Added Product",
        "data": []
      }
    }

    this.banner = "assets/images/sale.jpg"
    this.cardDetails = [
      {
        "title": "Watches",
        "image": '/assets/images/watches.jpg',
        "desc": "Find the best photography deals"
      },
      {
        "title": "Furnitures",
        "image": '/assets/images/furnitures.jpg',
        "desc": "Best of furnitures in store"
      },
      {
        "title": "Paint",
        "image": '/assets/images/86-Asian-Paint-full.jpeg',
        "desc": "Find the best deals here"
      },
      {
        "title": "Bricks",
        "image": '/assets/images/bricks.jpeg',
        "desc": "Deals you might be interested in"
      } 
    ]

    this.bannerCard = [
      {
        "title": "Wallets",
        "image": '/assets/images/wallets.jpg',
        "desc": "End of sale"
      },
      {
        "title": "Sunglasses",
        "image": '/assets/images/sunglass.jpg',
        "desc": "Deals to excite you"
      },
      
    ]
    this.desktopConfig = Constants.DESKTOP_CONFIG
    this.tabletConfig = Constants.TABLET_CONFIG
    this.mobileConfig = Constants.MOBILE_CONFIG
     this.recommendedProductList()
     this.recommendedSet()
     this.browsedHistory()
     this.newAddedProductSet()
     if(document.getElementById("idSearchInput")){
      let ele  = document.getElementById("idSearchInput")
      ele['value'] = null
     }
  }

  recommendedProductList() {
    let query = {
      q: `fashion`,
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

  handleSale() {
    let searchedText = 'sale' // should be dynamic...
    let qObject = Common.searchProducts(searchedText)
    if(qObject){
      this.router.navigate(['/products'], { queryParams: qObject })
    }
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
      q: `furnitures`,
      size: 10
    }
     this._productsService.get(query).
    subscribe(data => {
      if (data) {
        this.carousel.BrowsingHistory.data = data.hits.hit.map((v,i)=>{
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

  newAddedProductSet() {
    let query = {
      q: `watches`,
      size: 10
    }
     this._productsService.get(query).
    subscribe(data => {
      if (data) {
        this.carousel.newAddedProductSet.data = data.hits.hit.map((v,i)=>{
          v.fields.id = v.id
          v.fields.image1 = Common.getImageURI(null, v.fields.images[0])
          v.fields.image2 = Common.getImageURI(null, v.fields.images[1])
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

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  // onSlide(slideEvent: NgbSlideEvent) {
  //   if (this.unpauseOnArrow && slideEvent.paused &&
  //     (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
  //     this.togglePaused();
  //   }
  //   if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
  //     this.togglePaused();
  //   }
  // }
  
}
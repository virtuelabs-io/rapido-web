import { Component, OnInit, NgZone } from "@angular/core"
import { ProductsService } from "../../services/products/products.service"
import { Common } from "../../../../src/app/utils/common"
import { Constants } from "../../../app/utils/constants"
import { Router } from "@angular/router"
import { SearchItemService } from "../../shared-services/search-item/search-item.services"
import { OrdersService } from "../../services/orders/orders.service"
import { LoginStateService } from "../../shared-services/login-state/login-state.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  paused = false
  unpauseOnArrow = false
  pauseOnIndicator = false
  pauseOnHover = true
  cardDetails: any
  carousel: any
  desktopConfig: any
  tabletConfig: any
  mobileConfig: any
  bannerCard: any
  banner: any
  scroll: any
  productCategories = []
  isLoggedIn: Boolean
  freqBoughtSet: any

  private _productsService: ProductsService
  public _orderService: OrdersService
  constructor(
    productsService: ProductsService,
    private router: Router,
    private _searchItemService: SearchItemService,
    private ngZone: NgZone,
    orderService: OrdersService,
    private _loginStateService: LoginStateService
  ) {
    this._productsService = productsService
    this._orderService = orderService
  }

  ngOnInit() {
    this.carousel = {
      RecommendedList: {
        title: Constants.RECOMMENDEDLIST_TITLE,
        data: [],
      },
      FrequentlyBought: {
        title: Constants.FREQUENTLY_BOUGHT_TITLE,
        data: [],
      },
      FrequentlyBoughtByMe: {
        title: "",
        data: [],
      },
      BrowsingHistory: {
        title: Constants.BROWSING_HISTORY_TITLE,
        data: [],
      },
      newAddedProductSet: {
        title: Constants.NEWLY_ADDED_PRODUCTS_TITLE,
        data: [],
      },
    }

    this.banner = Common.getImageURI(null, "/images/home-page/sale.jpg") //"assets/images/sale.jpg"
    this.cardDetails = [
      {
        title: "Watches",
        image: Common.getImageURI(null, "/images/home-page/watches.jpg"),
        desc: "Find the best photography deals",
      },
      {
        title: "Furnitures",
        image: Common.getImageURI(null, "/images/home-page/furnitures.jpg"),
        desc: "Best of furnitures in store",
      },
      {
        title: "Paint",
        image: Common.getImageURI(
          null,
          "/images/home-page/86-Asian-Paint-full.jpeg"
        ),
        desc: "Find the best deals here",
      },
      {
        title: "Bricks",
        image: Common.getImageURI(null, "/images/home-page/bricks.jpeg"),
        desc: "Deals you might be interested in",
      },
    ]

    this.bannerCard = [
      {
        title: "Wallets",
        image: Common.getImageURI(null, "/images/home-page/wallets.jpg"),
        desc: "End of sale",
      },
      {
        title: "Sunglasses",
        image: Common.getImageURI(null, "/images/home-page/sunglass.jpg"),
        desc: "Deals to excite you",
      },
    ]
    this.desktopConfig = Constants.DESKTOP_CONFIG
    this.tabletConfig = Constants.TABLET_CONFIG
    this.mobileConfig = Constants.MOBILE_CONFIG
    // recommended prod
    this.recommendedProductList()
    //frequently bought
    this.getFrequentlyBought().then((data) => this.frequentlyBoughtSet(data))
    //frequently bought by me
    this.logInSession().then((data) => {
      if (data) {
        this.getFrequentlyBoughtByMe().then((data) => {
          if (data === []) {
            this.carousel.FrequentlyBoughtByMe.title =
              Constants.FREQUENTLY_BOUGHT_BY_ME_TITLE
            this.frequentlyBoughtByMeSet(data)
          }
        })
      }
    })
    // previosuly browsed
    this.browsedHistory()
    // newly added products
    this.newAddedProductSet()
    if (document.getElementById("idSearchInput")) {
      let ele = document.getElementById("idSearchInput")
      ele["value"] = null
    }
  }

  recommendedProductList() {
    let query = {
      q: `fashion`,
      size: 10,
    }
    this._productsService.get(query).subscribe((data) => {
      if (data) {
        this.carousel.RecommendedList.data = data.hits.hit.map((v, i) => {
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
        })
        if (data.error) {
          throw Error("error")
        }
        if (data.hits.found === 0) {
          return
        }
      }
    })
  }

  handleSale() {
    let searchedText = "sale" // should be dynamic...
    let qObject = Common.searchProducts(searchedText)
    if (qObject) {
      this.router.navigate(["/products"], { queryParams: qObject })
    }
  }

  logInSession() {
    return new Promise((resolve) => {
      this._loginStateService.isLoggedInState.subscribe(
        (state) => (this.isLoggedIn = state)
      )
      resolve(this.isLoggedIn)
    })
  }

  async getFrequentlyBoughtByMe() {
    return new Promise((resolve) => {
      this._orderService.getFrequentlyBoughtByMe().subscribe((data) => {
        this.freqBoughtSet = data
        resolve(data)
      })
    })
  }

  async frequentlyBoughtByMeSet(value) {
    var frequentlyBoughtByMeSet = []
    value.forEach((element) => {
      frequentlyBoughtByMeSet.push(element.product_id)
    })

    let query = {
      q: Common.getIdBasedQueryString(frequentlyBoughtByMeSet),
      size: frequentlyBoughtByMeSet.length,
      qdotparser: "structured",
    }

    this._productsService.get(query).subscribe((data) => {
      if (data) {
        this.carousel.FrequentlyBoughtByMe.data = data.hits.hit.map((v, i) => {
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
        })
        if (data.error) {
          throw Error("error")
        }
        if (data.hits.found === 0) {
          return
        }
      }
    })
  }

  getFrequentlyBought() {
    return new Promise((resolve) => {
      this._orderService.getFrequentlyBought().subscribe((data) => {
        this.freqBoughtSet = data
        resolve(data)
      })
    })
  }

  async frequentlyBoughtSet(value) {
    var frequentlyBoughtSet = []
    value.forEach((element) => {
      frequentlyBoughtSet.push(element.product_id)
    })

    let query = {
      q: Common.getIdBasedQueryString(frequentlyBoughtSet),
      size: frequentlyBoughtSet.length,
      qdotparser: "structured",
    }

    this._productsService.get(query).subscribe((data) => {
      if (data) {
        this.carousel.FrequentlyBought.data = data.hits.hit.map((v, i) => {
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
        })
        if (data.error) {
          throw Error("error")
        }
        if (data.hits.found === 0) {
          return
        }
      }
    })
  }

  browsedHistory() {
    let query = {
      q: `furnitures`,
      size: 10,
    }
    this._productsService.get(query).subscribe((data) => {
      if (data) {
        this.carousel.BrowsingHistory.data = data.hits.hit.map((v, i) => {
          v.fields.id = v.id
          v.fields.image = Common.getImageURI(null, v.fields.images[0])
          return v.fields
        })
        if (data.error) {
          throw Error("error")
        }
        if (data.hits.found === 0) {
          return
        }
      }
    })
  }

  newAddedProductSet() {
    let query = {
      q: `watches`,
      size: 10,
    }
    this._productsService.get(query).subscribe((data) => {
      if (data) {
        this.carousel.newAddedProductSet.data = data.hits.hit.map((v, i) => {
          v.fields.id = v.id
          v.fields.image1 = Common.getImageURI(null, v.fields.images[0])
          v.fields.image2 = Common.getImageURI(null, v.fields.images[1])
          return v.fields
        })
        if (data.error) {
          throw Error("error")
        }
        if (data.hits.found === 0) {
          return
        }
      }
    })
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle()
    } else {
      this.carousel.pause()
    }
    this.paused = !this.paused
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

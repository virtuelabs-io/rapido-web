import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchItemService } from '../../shared-services/search-item/search-item.services';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../services/cart/cart-item';
import { Common } from '../../../../src/app/utils/common';
import { Constants } from '../../../../src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteService } from '../../shared-services/route/route.service';
import { MatPaginator } from '@angular/material/paginator';
import { RatingsService } from '../../services/ratings/ratings.service';
import { OrdersService } from '../../services/orders/orders.service';
import { GuestCartService } from '../../services/guests/guest-cart.service';
import { GuestCartItem } from '../../services/guests/guest-cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _productsService: ProductsService;
  private _cartService: CartService;
  itemDetails: any;
  imagePreviewURI: any;
  imageDetails: any;
  itemId: any;
  mrpPrice: any;
  totalPrice: Number | string;
  Number: Function;
  quantity: number;
  rate: any;
  rateSummary: any;
  reviews: any;
  filteredReview: any;
  isLoggedIn: Boolean;
  reviewCount: number = 0;
  length: number;
  pageSize = 1;
  pageSizeOptions: number[] = [2];
  canReviewProduct: Boolean = true;
  public _ratingsService: RatingsService;
  private _orderService: OrdersService;
  private _guestCartService: GuestCartService;

  constructor(
    productsService: ProductsService,
    private _searchItemService: SearchItemService,
    private _loginStateService: LoginStateService,
    private _cartStateService: CartStateService,
    private cartService: CartService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private RouteService: RouteService,
    ratingsService: RatingsService,
    private ngZone: NgZone,
    orderService: OrdersService,
    guestCartService: GuestCartService,
    private route: ActivatedRoute
  ) {
    this._productsService = productsService;
    this._cartService = cartService;
    this._ratingsService = ratingsService;
    this._orderService = orderService;
    this._guestCartService = guestCartService;
  }

  ngOnInit() {
    this.rateSummary = [
      {
        count: 0,
        rating: 1
      },
      {
        count: 0,
        rating: 2
      },
      {
        count: 0,
        rating: 3
      },
      {
        count: 0,
        rating: 4
      },
      {
        count: 0,
        rating: 5
      }
    ];
    //this.paginator.pageIndex = 0
    this.Number = Number;
    // get current product id
    this.route.params.subscribe(params => {
      this.itemId = params.id;
    });
    this.checkUserLogIn();
    //this.checkProductPurchase()
    // get product details
    if (this.itemId) {
      this._searchItemService.responsePoductListState.subscribe(respData => {
        let { hits } = respData;
        if (hits.hit.length == 1 && hits.hit[0].id) {
          this.updateProductDetails(hits);
        } else {
          let query = {
            q: `(term field=_id ${this.itemId})`,
            size: 10,
            qdotparser: 'structured'
          };
          this._productsService.get(query).subscribe(data => {
            if (data) {
              if (data.error || data.hits.found === 0) {
                this.itemDetails = null;
                throw Error('error');
              }
              this.updateProductDetails(data.hits);
            }
          });
        }
      });
    }
  }

  keyPress(event: any) {
    Common.allowPositiveNum(event);
  }

  async checkUserLogIn() {
    await this.loginSessinExists().then(_ => this.checkProductPurchase());
  }

  checkProductPurchase() {
    if (this.isLoggedIn) {
      this._orderService.checkProductPurchase(this.itemId).subscribe(data => {
        if (data[0].length == 0) this.canReviewProduct = false;
      });
    }
  }

  async fetchProductRatings(id) {
    await this._ratingsService.getProductRatings(id).subscribe(data => {
      this.reviews = data;
      this.length = this.reviews.length;
      this.filteredReview = this.reviews.slice(0, this.pageSize);
    });
  }

  async getProductRatingsSummary(id) {
    await this._ratingsService.getProductRatingsSummary(id).subscribe(data => {
      this.rate = data;
      if (this.rate.length) {
        this.rate.map((v, i) => {
          this.reviewCount += v.count;
          this.rateSummary[v.rating - 1].count = v.count;
        });
        this.rateSummary.reverse();
      } else {
        this.reviewCount = 0;
      }
    });
  }

  fetchRatingsAfterDeactivate(id) {
    this.fetchProductRatings(id);
    this.getProductRatingsSummary(id);
  }

  updateProductDetails(hits) {
    let product = hits.hit.filter(val => {
      return val.id == this.itemId;
    });
    this.itemDetails = product[0].fields;
    this.imageDetails = Common.getImageURI(this.itemDetails.images, null);
    this.imagePreviewURI = this.imageDetails[0];
    this.imageDetails = this.setImageValue();
    this.mrpPrice = (
      this.itemDetails.price *
      (1 + parseFloat(this.itemDetails.offer))
    ).toFixed(2);
    this.totalPrice = this.itemDetails.price;
    this.quantity = 1;

    this.fetchProductRatings(this.itemId);
    this.getProductRatingsSummary(this.itemId);
  }

  setImageValue(index = 0) {
    return this.imageDetails.map((val, key) => {
      let thumbnailSel = false;
      if (index === key) {
        thumbnailSel = true;
      }
      return {
        active: thumbnailSel,
        uri: val.uri || val
      };
    });
  }

  showPicture(uri, index) {
    this.imageDetails = this.setImageValue(index);
    this.imagePreviewURI = uri;
  }

  onChangeQuantity(quant: number) {
    if (Number(quant) < 1) {
      this.quantity = 1;
      this._snackBar.open(Constants.ORDER_QUANTITY_ERROR, undefined, {
        duration: 4000
      });
    } else if (Number(quant) > 100) {
      this.quantity = 100;
      this._snackBar.open(Constants.EXCEEDED_ORDER_QUANTITY_ERROR, undefined, {
        duration: 4000
      });
    } else {
      this.quantity = quant;
    }
    this.totalPrice = Number(this.quantity * this.itemDetails.price).toFixed(2);
  }

  async addItemsToCart() {
    await this.loginSessinExists().then(_ => this.postCartItem());
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      state => (this.isLoggedIn = state)
    );
  }

  async postCartItem() {
    this._loginStateService.loaderEnable();
    if (this.isLoggedIn) {
      let cartItem: CartItem = new CartItem();
      cartItem.product_id = parseInt(this.itemId);
      cartItem.quantity = this.quantity;
      cartItem.in_cart = true;
      await this._cartService.postCartItem(cartItem).subscribe(_ => {
        this._cartStateService.fetchAndUpdateCartCount(this.isLoggedIn);
        this._loginStateService.loaderDisable();
        this._snackBar.open(Constants.ITEM_MOVED_TO_CART, undefined, {
          duration: 4000,
          horizontalPosition: 'center'
        });
      });
    } else {
      let guestCartItem: GuestCartItem = new GuestCartItem();
      guestCartItem.product_id = parseInt(this.itemId);
      guestCartItem.quantity = this.quantity;
      this._guestCartService.postGuestCartItem(guestCartItem).subscribe(_ => {
        this._cartStateService.fetchAndUpdateCartCount(this.isLoggedIn);
        this._loginStateService.loaderDisable();
        this._snackBar.open(Constants.ITEM_MOVED_TO_CART, undefined, {
          duration: 4000,
          horizontalPosition: 'center'
        });
      });
    }
  }

  async handleError(err) {
    if (err == "Login Session doesn't exist!") {
      this._snackBar.open(
        `${Constants.SESSION_LOST} please login to add items to cart`,
        undefined,
        {
          duration: 4000
        }
      );
      this.RouteService.changeRoute('products/details/' + this.itemId);
      this.router.navigateByUrl('/login');
    }
  }

  onPaginateChange(data) {
    if (data.pageIndex == 0) {
      this.filteredReview = this.reviews.slice(
        data.pageIndex * data.pageSize,
        data.pageSize
      );
    } else {
      this.filteredReview = this.reviews.slice(
        data.pageIndex * data.pageSize,
        data.pageSize + data.pageIndex * data.pageSize
      );
    }
  }

  handleCreateReview(id) {
    this._loginStateService.loaderEnable();
    this._ratingsService.checkProductReview(id).subscribe(data => {
      this.handleReviewNavigation(data, id);
    });
  }

  handleReviewNavigation(data, id) {
    if (data.length) {
      this._loginStateService.loaderDisable();
      this.ngZone
        .run(() => this.router.navigate(['review/edit/review', data[0].id]))
        .then();
    } else {
      this._loginStateService.loaderDisable();
      this.ngZone
        .run(() => this.router.navigate(['review/create/product', id]))
        .then();
    }
  }
}

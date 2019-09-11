import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator
	private _productsService: ProductsService
	private _cartService: CartService
	itemDetails: any 
	imagePreviewURI: any
	imageDetails: any
	itemId: any
	mrpPrice: any
	totalPrice: Number|string
	Number:Function
	quantity:number
	rate: any
	reviews: any
	filteredReview: any
	isLoggedIn:Boolean
	reviewCount: number = 0
	length : number
	pageSize = 1
	pageSizeOptions: number[] = [2];
	public _ratingsService: RatingsService

	constructor(productsService: ProductsService,
		private _searchItemService: SearchItemService,
		private _loginStateService: LoginStateService,
		private _cartStateService: CartStateService,
		private cartService: CartService,
		public router: Router, 
		private _snackBar: MatSnackBar,
		private RouteService : RouteService,
		ratingsService: RatingsService,
		private route: ActivatedRoute) {
		this._productsService = productsService
		this._cartService = cartService
		this._ratingsService = ratingsService
	}

	ngOnInit() {
		//this.paginator.pageIndex = 0
		this.Number = Number
		// get current product id
		this.route.params.subscribe(params => {
			this.itemId = params.id;
		});

		// get product details
		if (this.itemId) {
			this._searchItemService.responsePoductListState.subscribe(respData => {
				let { hits } = respData
				if (hits.hit.length == 1  && hits.hit[0].id) {
					this.updateProductDetails(hits)
				} else {
					let query = {
						q: `(term field=_id ${this.itemId})`,
						size: 10,
						qdotparser: 'structured'
					}
					this._productsService.get(query).
					subscribe(data => {
						if (data) {
							if (data.error || data.hits.found === 0) {
								this.itemDetails = null
								throw Error('error')
							}
							this.updateProductDetails(data.hits)
						}
					})
				}
			})
		}
	}

	keyPress(event: any){
		Common.allowPositiveNum(event)
	}

	fetchProductRatings(id) {
		this._ratingsService.getProductRatings(id)
		.subscribe(data => {
			console.log(data)
			this.reviews = data
			this.length = this.reviews.length
			this.filteredReview = this.reviews.slice(0, this.pageSize)
		})
	}

	getProductRatingsSummary(id) {
		this._ratingsService.getProductRatingsSummary(id)
		.subscribe(data => {
		  this.rate = data
		  for(var i = 0; i < this.rate.length; i++) {
			this.reviewCount += this.rate[i].count
		  }
		})
	}

	updateProductDetails(hits) {
		let product = hits.hit.filter((val) => {
			return val.id == this.itemId
		})
		this.itemDetails = product[0].fields
		this.imageDetails = Common.getImageURI(this.itemDetails.images, null)
		this.imagePreviewURI = this.imageDetails[0]
		this.imageDetails = this.setImageValue()
		this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)
		this.totalPrice = this.itemDetails.price
		this.quantity = 1

		this.fetchProductRatings(this.itemId)
		this.getProductRatingsSummary(this.itemId)
	}

	setImageValue(index = 0) {
		return this.imageDetails.map((val, key) => {
			let thumbnailSel = false
			if (index === key) {
				thumbnailSel = true
			}
			return ({
				active: thumbnailSel,
				uri: val.uri || val
			})
		})
	}

	showPicture(uri, index) {
		this.imageDetails = this.setImageValue(index)
		this.imagePreviewURI = uri
	}
	
	onChangeQuantity(quant:number) {
		if(Number(quant) < 1){
			this.quantity = 1
			this._snackBar.open(Constants.ORDER_QUANTITY_ERROR,  undefined , {
				duration: 4000,
			 })
		}else{
			this.quantity = quant
		}
		this.totalPrice = Number(this.quantity * this.itemDetails.price).toFixed(2)
	}
	
	async addItemsToCart() {
		await this.loginSessinExists().
		then( _ => this.postCartItem()).
		catch(err => this.handleError(err))
	}

	async loginSessinExists(){
		 await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
	}
		
	async postCartItem(){
		this._loginStateService.loaderEnable()
		let cartItem: CartItem = new CartItem()
		cartItem.product_id = parseInt(this.itemId) 
    	cartItem.quantity = this.quantity
		cartItem.in_cart = true
		if(this.isLoggedIn){
			await this._cartService.postCartItem(cartItem).subscribe(data => {
				this._loginStateService.loaderDisable()
				this._snackBar.open(Constants.ITEM_MOVED_TO_CART,  undefined , {
					duration: 4000,
					horizontalPosition: 'center'
				 })
				 this._cartStateService.fetchAndUpdateCartCount()
			})
		}else{
			this._loginStateService.loaderDisable()
			await Promise.reject("Login Session doesn't exist!")
		}
	}

	async handleError(err){
		if(err=="Login Session doesn't exist!"){
			this._snackBar.open(`${Constants.SESSION_LOST} please login to add items to cart`,  undefined , {
				duration: 4000,
			 })
			 this.RouteService.changeRoute('products/details/'+this.itemId)
			 this.router.navigateByUrl('/login')
		}
   }

   onPaginateChange(data) {
	if(data.pageIndex == 0) {
		this.filteredReview = this.reviews.slice(data.pageIndex*data.pageSize, data.pageSize);
	}
	else {
		this.filteredReview = this.reviews.slice(data.pageIndex*data.pageSize, data.pageSize+data.pageIndex*data.pageSize);
	}
  }

}
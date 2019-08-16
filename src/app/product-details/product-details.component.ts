import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchItemService } from '../shared-services/search-item/search-item.services';
import { LoginStateService } from '../shared-services/login-state/login-state.service';
import { CartStateService } from '../shared-services/cart-state/cart-state.service';
import { ProductsService } from '../services/products/products.service';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../services/cart/cart-item';
import { Common } from '../../../src/app/utils/common';
import { Constants } from '../../../src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteService } from '../shared-services/route/route.service';

@Component({
	selector: 'app-product-details',
	templateUrl: './product-details.component.html',
	styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

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
	isLoggedIn:Boolean
	constructor(productsService: ProductsService,
		private _searchItemService: SearchItemService,
		private _loginStateService: LoginStateService,
		private _cartStateService: CartStateService,
		private cartService: CartService,
		public router: Router, 
		private _snackBar: MatSnackBar,
		private RouteService : RouteService,
		private route: ActivatedRoute) {
		this._productsService = productsService
		this._cartService = cartService
	}

	ngOnInit() {

		this.Number = Number
		// get current product id
		this.route.params.subscribe(params => {
			this.itemId = params.id;
		});

		// get product details
		if (this.itemId) {
			this._searchItemService.responsePoductListState.subscribe(respData => {
				let {
					hits
				} = respData
				if (hits.hit[0].id) {
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
							if (data.error) {
								throw Error('error')
							}
							if (data.hits.found === 0) {
								return;
							}
							this.updateProductDetails(data.hits)
						}
					})
				}
			})
		}


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
		if(quant < 0){
			this._snackBar.open(Constants.ORDER_QUANTITY_ERROR,  undefined , {
				duration: 4000,
			 })
		}else{
			this.quantity = quant
			this.totalPrice = Number(quant * this.itemDetails.price).toFixed(2)
		}
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
		let cartItem: CartItem = new CartItem()
		cartItem.product_id = parseInt(this.itemId) 
    	cartItem.quantity = this.quantity
		cartItem.in_cart = true
		if(this.isLoggedIn){
			await this._cartService.postCartItem(cartItem).subscribe(data => {
				this._snackBar.open(Constants.ITEM_MOVED_TO_CART,  undefined , {
					duration: 4000,
				 })
				 this._cartStateService.fetchAndUpdateCartCount()
			})
		}else{
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

}
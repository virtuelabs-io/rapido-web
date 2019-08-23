import { Component, Input, OnInit, SimpleChanges, Directive } from '@angular/core';
import { CartItem } from '../../services/cart/cart-item';
import { CartService } from '../../services/cart/cart.service';
import { CartStateService } from '../../shared-services/cart-state/cart-state.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from '../../shared-services/route/route.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
  @Input() carouselCard = []
  @Input() carouselConfig = {}
  @Input() carouselTitle = ""
  carouselData: any
  config: any
  isLoggedIn:Boolean
  private _cartService: CartService
  constructor(
    private cartService: CartService,
    private _cartStateService: CartStateService,
    private _loginStateService: LoginStateService,
    public router: Router,
    private RouteService : RouteService
  ) { 
    this._cartService = cartService

  }

  ngOnInit() {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)
  }

  ngOnChanges(changes: SimpleChanges) {
    this.config = this.carouselConfig
    this.carouselData = this.formatData(this.carouselCard, this.config.itemsInTemplate)
  }

  formatData(data: any[], itemsInTemplate: number) {
    let formatedData = []
    let tmpItems = []
    if(data) {
      data.forEach(item => {
        item.mrpPrice = (item.price * (1 + parseFloat(item.offer))).toFixed(2)
        item.discountedPrice = (item.mrpPrice - item.price).toFixed(2)
        item.price = Number(item.price).toFixed(2)
        
        tmpItems.push(item)
        if(tmpItems.length === itemsInTemplate) {
          formatedData.push(tmpItems)
          
          tmpItems = []
        }
      })
      if(tmpItems.length > 0) {
        formatedData.push(tmpItems)
        tmpItems = []
      }
    }
    return formatedData
  }

  async handleCart(id) {
		
		await this.loginSessinExists().
		then( _ => this.postCartItem(id)).
		then( _ => this._cartService.getCountOfInCartItems()).
		then(count => this._cartStateService.updateCartCount(Number(count))).
		catch(err => this.handleError(err))
  }

  async loginSessinExists(){
    await (this._loginStateService.isLoggedInState.subscribe(state => this.isLoggedIn = state))
 }
  
 async postCartItem(id) {
    let cartItem: CartItem = new CartItem()
		cartItem.product_id = parseInt(id) 
    	cartItem.quantity = 1
		cartItem.in_cart = true
		if(this.isLoggedIn){
			await this._cartService.postCartItem(cartItem).subscribe(data => data)
		}else{
			await Promise.reject("Login Session doesn't exist!")
		}
  }

  async handleError(err){
    this.RouteService.changeRoute('')
    this.router.navigateByUrl('/login')
   }
}
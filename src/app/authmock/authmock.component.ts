import { Component, OnInit } from '@angular/core';
import { Registration } from '../services/authentication/helpers/registration';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { SignUpService } from '../services/authentication/sign-up/sign-up.service';
import { ResendConfirmationCodeService } from '../services/authentication/resend-confirmation-code/resend-confirmation-code.service';
import { ConfirmRegistrationService } from '../services/authentication/confirm-registration/confirm-registration.service';
import { SignInService } from '../services/authentication/sign-in/sign-in.service';
import { UpdateAttributeService } from '../services/authentication/update-attribute/update-attribute.service';
import { ChangePasswordService } from '../services/authentication/change-password/change-password.service';
import { ForgotPasswordService } from '../services/authentication/forgot-password/forgot-password.service';
import { DeleteUserService } from '../services/authentication/delete-user/delete-user.service';
import { ProductsService } from '../services/products/products.service';
import { Query } from '../services/products/query.interface';
import { ProductsHierarchyService } from '../services/products/products-hierarchy.service';
import { CompanyDetails } from '../services/customer/company-details';
import { CompanyDetailsService } from '../services/customer/company-details.service';
import { AddressDetails } from '../services/customer/address-details';
import { AddressDetailsService } from '../services/customer/address-details.service';
import { CartService } from '../services/cart/cart.service';
import { CartItem } from '../services/cart/cart-item';
import { CartItemDetails } from '../services/cart/cart-item-details';
import { OrdersService } from '../services/orders/orders.service';
import { Order } from '../services/orders/order';
import { AddressDetailsMockService } from '../services/customer/address-details.mock.service';
import { Rating } from '../services/ratings/rating';
import { RatingsService } from '../services/ratings/ratings.service';

@Component({
  selector: 'app-authmock',
  templateUrl: './authmock.component.html',
  styleUrls: ['./authmock.component.scss']
})
export class AuthmockComponent implements OnInit {

  _profileService: ProfileService;

  _confirmationCode: string;

  _newPassword: string = "Rocky2011";

  _verificationCode: string;

  company_details_result: string;

  address_details_id: number;

  address_details_result: string;

  mock_address_details_result: string;

  cart_item_result: string;

  order_result: string;

  rating_result: string;

  companyDetails: CompanyDetails = new CompanyDetails(
    "Sample pvt ltd",
    "addr_1",
    "city",
    "county",
    "country",
    "postcode",
    "addr_2"
  )

  addressDetails: AddressDetails = new AddressDetails(
    "Full name",
    1, // check Constants.ADDRESS_TYPES for different types of addresses. Only those should be used
    "addr_1",
    "city",
    "county",
    "country",
    "postcode",
    "addr_2"
  )

  _registration: Registration = new Registration(
    "+447783307487",
    "reddy.horcrux@gmail.com",
    "Sangram Reddy",
    "Sangram1992",
    "true",
    "true",
    "true",
    "true",
    "true"
  );

  rating: Rating = new Rating()

  order: Order = new Order()

  _query: Query = {
    q: "watches",
    size: 1,
    cursor: null, // always use either cursor or start, but bot both
    return: null,
    start: null, // always use either cursor or start, but bot both
    sort: null,
    qdotparser: null
  }

  _userRegisteredResponse: Boolean = false;
  _resentConfirmationCodeResponse: Boolean = false;
  _confirmRegistrationResponse: Boolean = false;
  _signInResponse: Boolean = false;
  _updatedAttribute: Boolean = false;
  _changedPassword: Boolean = false;
  _forgottenPassword: Boolean = false;
  _deletedUser: Boolean = false;
  _productsFetched = false;
  _fetchedProductHierarchy = false;

  _cart_item_id: number;

  private _signUpService: SignUpService
  private _resendConfirmationCodeService: ResendConfirmationCodeService
  private _confirmRegistrationService: ConfirmRegistrationService
  private _signInService: SignInService
  private _updateAttributeService: UpdateAttributeService
  private _changePasswordService: ChangePasswordService
  private _forgotPasswordService: ForgotPasswordService
  private _deleteUserService: DeleteUserService
  private _productsService: ProductsService
  private _productHierarchyService: ProductsHierarchyService
  private _companyDetailsService: CompanyDetailsService
  private _addressDetailsService: AddressDetailsService
  private _cartService: CartService
  private _orderService: OrdersService
  private _addressDetailsMockService: AddressDetailsMockService
  private _ratingsService: RatingsService

  constructor(
    signUpService: SignUpService,
    profileService: ProfileService,
    resendConfirmationCodeService: ResendConfirmationCodeService,
    confirmRegistrationService: ConfirmRegistrationService,
    signInService: SignInService,
    updateAttributeService: UpdateAttributeService,
    changePasswordService: ChangePasswordService,
    forgotPasswordService: ForgotPasswordService,
    deleteUserService: DeleteUserService,
    productsService: ProductsService,
    productHierarchyService: ProductsHierarchyService,
    companyDetailsService: CompanyDetailsService,
    addressDetailsService: AddressDetailsService,
    cartService: CartService,
    orderService: OrdersService,
    addressDetailsMockService: AddressDetailsMockService,
    ratingsService: RatingsService
    ) {
    this._signUpService = signUpService
    this._profileService = profileService
    this._resendConfirmationCodeService = resendConfirmationCodeService,
    this._confirmRegistrationService = confirmRegistrationService
    this._signInService = signInService
    this._updateAttributeService = updateAttributeService
    this._changePasswordService = changePasswordService
    this._forgotPasswordService = forgotPasswordService
    this._deleteUserService = deleteUserService
    this._productsService = productsService
    this._productHierarchyService = productHierarchyService
    this._companyDetailsService = companyDetailsService
    this._addressDetailsService = addressDetailsService
    this._cartService = cartService
    this._orderService = orderService
    this._addressDetailsMockService = addressDetailsMockService
    this._ratingsService = ratingsService
  }

  ngOnInit() {
  }

  registerUser(){
    this._registration.createAttributeList()
    this._signUpService.signUpData = {
      phone_number: this._registration.phone_number,
      password: this._registration.password,
      attributeList: this._registration.attributeList
    }

    const promise = this._signUpService.signUp()
    promise.then(value => {
      this._userRegisteredResponse = true;
      console.log(value) // response from successfull resolve
      console.log(this._profileService.cognitoUser); // updated user profile
    }).catch(error => {
      this._userRegisteredResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  resendConfirmationCode(){
    this._resendConfirmationCodeService.username = this._registration.phone_number
    const promise = this._resendConfirmationCodeService.resendConfirmationCode()
    promise.then(value => {
      this._resentConfirmationCodeResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._resentConfirmationCodeResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  confirmRegistration(){
    this._confirmRegistrationService.username = this._registration.phone_number
    const promise = this._confirmRegistrationService.confirmRegistration(this._confirmationCode)
    promise.then(value => {
      this._confirmRegistrationResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._confirmRegistrationResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  login(){
    this._signInService.signInData = {
      Username: this._registration.phone_number,
      Password: this._registration.password
    }

    const promise = this._signInService.login()
    promise.then(value => {
      this._signInResponse = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._signInResponse = false;
      console.log(error) // response from a graceful reject
    })
  }

  updateAttribute(){
    this._updateAttributeService.attributeList = this._registration.createUpdateAttributeList()
    const promise = this._updateAttributeService.updateAttributes()
    promise.then(value => {
      this._updatedAttribute = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._updatedAttribute = false;
      console.log(error) // response from a graceful reject
    })
  }

  changePassword(){
    this._changePasswordService.oldPassword = this._registration.password
    this._changePasswordService.newPassword = this._newPassword
    const promise = this._changePasswordService.changePassowrd()
    promise.then(value => {
      this._changedPassword = true;
      this._registration.password = this._newPassword
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._changedPassword = false;
      console.log(error) // response from a graceful reject
    })
  }

  forgotPassword(){
    this._forgotPasswordService.username = this._registration.phone_number
    const promise = this._forgotPasswordService.forgotPassword()
    promise.then(value => {
      this._forgottenPassword = true;
      this._registration.password = this._newPassword
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._forgottenPassword = false;
      console.log(error) // response from a graceful reject
    })
  }

  deleteUser(){
    const promise = this._deleteUserService.deleteUser()
    promise.then(value => {
      this._deletedUser = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._deletedUser = false;
      console.log(error) // response from a graceful reject
    })
  }

  queryProducts(){
    this._productsService.get(this._query)
      .subscribe(data => {
        console.log(data)
        this._productsFetched = true;
      })
  }

  getProductHierarchy(){
    this._productHierarchyService.get()
    .subscribe(data => {
      console.log(data)
      this._fetchedProductHierarchy = true;
    })
  }

  getCompanyDetails(){
    this._companyDetailsService.getCompanyDetails()
    .subscribe(data => {
      console.log(data)
      this.company_details_result = "Sucessfully fetched customer company details and logged!";
    })
  }

  postCompanyDetails(){
    this._companyDetailsService.postCompanyDetails(this.companyDetails)
    .subscribe(data => {
      console.log(data)
      this.company_details_result = "Sucessfully posted customer company details and logged!";
    })
  }

  putCompanyDetails(){
    this.companyDetails.company_name = "Updated Company Pvt Ltd"
    this._companyDetailsService.putCompanyDetails(this.companyDetails)
    .subscribe(data => {
      console.log(data)
      this.company_details_result = "Sucessfully updated customer company details and logged!";
    })
  }

  deleteCompanyDetails(){
    this._companyDetailsService.deleteCompanyDetails()
    .subscribe(data => {
      console.log(data)
      this.company_details_result = "Sucessfully deleted customer company details and logged!";
    })
  }

  getAddressDetails(){
    this._addressDetailsService.getAddressDetails(this.address_details_id)
    .subscribe(data => {
      console.log(data)
      this.address_details_result = "Sucessfully fetched address details and logged!";
    })
  }

  getAddressDetailsList(){
    this._addressDetailsService.getAddressDetailsList()
    .subscribe(data => {
      console.log(data)
      if(data['length'] > 0){
        this.address_details_id = data[0]['id']
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully fetched address details List and logged!";
    })
  }

  postAddressDetails(){
    this._addressDetailsService.postAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      if(data['insertId']){
        this.address_details_id = data['insertId']
        console.log('Sucessfully updated the address test id to: ' + String(this.address_details_id))
      }
      this.address_details_result = "Sucessfully posted address company details and logged!";
    })
  }

  putAddressDetails(){
    this.addressDetails.full_name = "Updated full name"
    this.addressDetails.id = this.address_details_id
    this._addressDetailsService.putAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      this.address_details_result = "Sucessfully updated customer address details and logged!";
    })
  }

  deleteAddressDetails(){
    this._addressDetailsService.deleteAddressDetails(this.address_details_id)
    .subscribe(data => {
      console.log(data)
      this.address_details_id = null
      this.address_details_result = "Sucessfully deleted customer address details and logged!";
    })
  }

  getAddressDetailsMock(){
    this._addressDetailsMockService.getAddressDetails(1)
    .subscribe(data => {
      console.log(data)
      this.mock_address_details_result = "Sucessfully fetched mock address details and logged!";
    })
  }

  getAddressDetailsListMock(){
    this._addressDetailsMockService.getAddressDetailsList()
    .subscribe(data => {
      console.log(data)
      if(data['length'] > 0){
        console.log('Sucessfully updated the address test id to: 1')
      }
      this.mock_address_details_result = "Sucessfully fetched mock address details List and logged!";
    })
  }

  postAddressDetailsMock(){
    this._addressDetailsMockService.postAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      if(data['insertId']){
        console.log('Sucessfully updated the address test id to: 1')
      }
      this.mock_address_details_result = "Sucessfully posted mock address company details and logged!";
    })
  }

  putAddressDetailsMock(){
    this.addressDetails.id = 1
    this._addressDetailsMockService.putAddressDetails(this.addressDetails)
    .subscribe(data => {
      console.log(data)
      this.mock_address_details_result = "Sucessfully updated mock customer address details and logged!";
    })
  }

  deleteAddressDetailsMock(){
    this._addressDetailsMockService.deleteAddressDetails(1)
    .subscribe(data => {
      console.log(data)
      this.mock_address_details_result = "Sucessfully deleted mock customer address details and logged!";
    })
  }

  makeCartItem(): CartItem {
    this._cart_item_id = Math.floor(Math.random() * 10)
    this._cart_item_id = this._cart_item_id < 1 ? this._cart_item_id+1 : this._cart_item_id
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = this._cart_item_id
    cartItem.quantity = Math.floor(Math.random() * 10) + 1
    cartItem.in_cart = true
    console.log("Created product with id:", cartItem.product_id)
    return cartItem
  }

  updateCartItem(product_id: number): CartItem {
    let cartItem: CartItem = new CartItem()
    cartItem.product_id = product_id
    cartItem.quantity = Math.floor(Math.random() * 10) + 1
    cartItem.in_cart = true
    console.log("Updated product with id:", cartItem.product_id)
    return cartItem
  }

  getCartItems(){
    this._cartService.getCartItems()
    .then((data: any) => {
      console.log(data)
      this.cart_item_result = "Sucessfully fetched cart items and logged!";
    })
  }

  getInCartItems(){
    this._cartService.getInCartItems()
    .then((data: any) => {
      console.log(data)
      this.cart_item_result = "Sucessfully fetched InCartItems and logged!";
    })
  }

  getCountOfInCartItems(){
    this._cartService.getCountOfInCartItems()
    .then((data: any) => {
      console.log(data)
      this.cart_item_result = "Sucessfully fetched getCountOfInCartItems and logged!";
    })
  }

  getSavedForLaterCartItems(){
    this._cartService.getSavedForLaterCartItems()
    .then((data: any) => {
      console.log(data)
      this.cart_item_result = "Sucessfully fetched SavedForLaterCartItems and logged!";
    })
  }

  postCartItem(){
    this._cartService.postCartItem(this.makeCartItem())
    .subscribe(data => {
      console.log(data)
      this.cart_item_result = "Sucessfully posted cart item and logged!";
    })
  }

  postCartItems(){
    this._cartService.getInCartItems()
    .then((data: any) => {
      console.log("Data before change", data)
      console.log(data)
      let items = [];
      let ele: any;
      for (ele in data) {
        items.push(this.updateCartItem(data[ele].cartItem.product_id))
      }
      console.log("Data after change", items)
      this._cartService.postCartItemList(items)
      .subscribe(data2 => {
        console.log("Cart confirmed data", data2)
        this.cart_item_result = "Sucessfully posted cart items and logged!";
      })
    })
  }

  deleteInCartItems(){
    this._cartService.deleteInCartItems()
    .subscribe(data => {
      console.log(data)
      this.cart_item_result = "Sucessfully deleted in cart items and logged!";
    })
  }

  deleteCartItem(){
    this._cartService.deleteCartItem(this._cart_item_id)
    .subscribe(data => {
      console.log(data)
      this.cart_item_result = "Sucessfully deleted item and logged!";
    })
  }

  createOrder(){
    this.order.delivery_address_id = 2
    this._orderService.createOrder(this.order)
    .then((data: any) => {
      console.log(data)
      this.order.order_id = parseInt(Object.keys(data['orderItemsObject'])[0])
      this.order_result = "Sucessfully created order and logged!";
    })
  }

  confirmOrder(){
    this.order.charge_id = "ch_authmock"
    console.log("Confirming order for:", this.order)
    this._orderService.confirmOrder(this.order)
    .then((data: any) => {
      console.log(data)
      this.order_result = "Sucessfully confirmed order and logged!";
    })
  }

  cancelOrder(){
    console.log("Canceling order for:", this.order.order_id)
    this._orderService.cancelOrder(this.order.order_id)
    .subscribe(data => {
      console.log(data)
      this.order_result = "Sucessfully cancled order and logged!";
    })
  }

  checkProductPurchase(){
    console.log("checkProductPurchase order for: 9")
    this._orderService.checkProductPurchase(9)
    .subscribe(data => {
      console.log(data)
      this.order_result = "Sucessfully checkProductPurchase";
    })
  }

  getDeliveryOptions(){
    console.log("getDeliveryOptions fired")
    this._orderService.getDeliveryOptions()
    .subscribe(data => {
      console.log(data)
      this.order_result = "Sucessfully getched getDeliveryOptions";
    })
  }

  getOrder(){
    this.order.order_id = 103
    console.log("Fetching order for:", this.order.order_id)
    this._orderService.getOrder(this.order.order_id)
    .then((data: any) => {
      console.log(data)
      this.order_result = "Sucessfully fetched order and logged!";
    })
  }

  getOrders(){
    this._orderService.getOrders()
    .then((data: any) => {
      console.log(data)
      this.order_result = "Sucessfully fetched orders and logged!";
    })
  }

  createRating(){
    this.rating.product_id = 33
    this.rating.title = "Value for money"
    this.rating.rating = 3
    this.rating.summary = "A very good product"
    this._ratingsService.createRating(this.rating)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully created a rating')
      }
      this.rating_result = "Sucessfully created a rating";
    })
  }

  updateRating(){
    this.rating.id = 3
    this.rating.title = "Value for money updated"
    this.rating.rating = 4
    this.rating.summary = "A very good product updated"
    this._ratingsService.updateRating(this.rating)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully updated a rating')
      }
      this.rating_result = "Sucessfully updated a rating";
    })
  }

  getCustomerRating(){
    this._ratingsService.getCustomerRating(3)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully fetched a rating')
      }
      this.rating_result = "Sucessfully fetched a rating";
    })
  }

  getAllCustomerRatings(){
    this._ratingsService.getAllCustomerRatings()
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully fetched all rating')
      }
      this.rating_result = "Sucessfully fetched all rating";
    })
  }

  deleteCustomerRating(){
    this._ratingsService.deleteCustomerRating(3)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully deleted rating')
      }
      this.rating_result = "Sucessfully deleted rating";
    })
  }

  helpfulRatingIncrement(){
    this._ratingsService.helpfulRatingIncrement(3)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully helpfulRatingIncrement')
      }
      this.rating_result = "Sucessfully helpfulRatingIncrement";
    })
  }

  deactivateRating(){
    this._ratingsService.deactivateRating(3)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully deactivateRating')
      }
      this.rating_result = "Sucessfully deactivateRating";
    })
  }

  getProductRatings(){
    this._ratingsService.getProductRatings(33)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully getProductRatings')
      }
      this.rating_result = "Sucessfully getProductRatings";
    })
  }

  getProductRatingsSummary(){
    this._ratingsService.getProductRatingsSummary(33)
    .subscribe(data => {
      console.log(data)
      if(data){
        console.log('Sucessfully getProductRatingsSummary')
      }
      this.rating_result = "Sucessfully getProductRatingsSummary";
    })
  }
}

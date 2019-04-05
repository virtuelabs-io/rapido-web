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

  _query: Query = {
    q: "watches",
    size: 1,
    cursor: null, // always use either cursor or start, but bot both
    start: null, // always use either cursor or start, but bot both
    sort: null
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
    productHierarchyService: ProductsHierarchyService
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

  signIn(){
    this._signInService.signInData = {
      Username: this._registration.phone_number,
      Password: this._registration.password
    }

    const promise = this._signInService.signIn()
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
}

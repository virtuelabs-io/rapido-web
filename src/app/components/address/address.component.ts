import { Component, OnInit, NgZone } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AddressDetailsService } from '../../services/customer/address-details.service'
import { RouteService } from '../../shared-services/route/route.service'
import { SessionService } from '../../services/authentication/session/session.service'
import { LoginStateService } from '../../shared-services/login-state/login-state.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  address_details_id: number
  isLoggedIn: Boolean
  public _addressDetailsService: AddressDetailsService
  address: any
  delRes: any
  example: any
  constructor(
    public router: Router,
    addressDetailsService: AddressDetailsService,
    private _sessionService: SessionService,
    private actRoute: ActivatedRoute,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone
  ) {
    this._addressDetailsService = addressDetailsService
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists()
      .then((_) => this.getAddressList())
      .catch((err) => this.handleError(err))
  }

  async handleError(err) {
    this.RouteService.changeRoute('profile/address')
    this.router.navigateByUrl('/login')
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      (state) => (this.isLoggedIn = state)
    )
  }

  ngOnInit() {
    this.userLogInCheck()
  }

  async getAddressList() {
    this._loginStateService.loaderEnable()
    if (this.isLoggedIn) {
      await this._addressDetailsService
        .getAddressDetailsList()
        .subscribe((data) => {
          if (data['length'] > 0) {
            this.address_details_id = data[0]['id']
            this.address = data
          } else if (data['length'] === 0) {
            this.address = data
          }
          this._loginStateService.loaderDisable()
        })
    } else {
      await Promise.reject("Login Session doesn't exist!")
    }
  }

  addressDelete(id) {
    this._loginStateService.loaderEnable()
    this._addressDetailsService.deleteAddressDetails(id).subscribe((data) => {
      this.delRes = data
      this.address_details_id = null
      this.getAddressList()
    })
  }
  addressEdit(id) {
    this.ngZone
      .run(() => this.router.navigate(['profile/address/editAddress', id]))
      .then()
  }

  newAddress() {
    this.RouteService.changeRoute('profile')
    this.ngZone
      .run(() => this.router.navigate(['profile/address/newAddress']))
      .then()
  }
}

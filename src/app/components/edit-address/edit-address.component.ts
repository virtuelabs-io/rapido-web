import { Component, OnInit, NgZone } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AddressDetails } from '../../services/customer/address-details'
import { AddressDetailsService } from '../../services/customer/address-details.service'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { LoginStateService } from '../../shared-services/login-state/login-state.service'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  id: number = 0
  customer_id: string = ''
  addressDetails: AddressDetails
  public _addressDetailsService: AddressDetailsService
  addressFormGroup: FormGroup // UI reactive Form Group variable

  constructor(
    addressDetailsService: AddressDetailsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone
  ) {
    this._addressDetailsService = addressDetailsService
  }

  ngOnInit() {
    this._loginStateService.loaderEnable()
    this.addressFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      add1: new FormControl('', [Validators.required]),
      add2: new FormControl('', [Validators.required]),
      town_city: new FormControl('', [Validators.required]),
      postCode: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      address_type_id: new FormControl(1, [Validators.required]),
      county: new FormControl('', [Validators.required])
    })
    this.id = parseInt(this.actRoute.snapshot.paramMap.get('id'))
    this._addressDetailsService.getAddressDetails(this.id).subscribe(data => {
      this.customer_id = data.customer_id
      this.addressFormGroup.controls['name'].setValue(data.full_name)
      this.addressFormGroup.controls['add1'].setValue(data.addr_1)
      this.addressFormGroup.controls['add2'].setValue(data.addr_2)
      this.addressFormGroup.controls['town_city'].setValue(data.city)
      this.addressFormGroup.controls['postCode'].setValue(data.postcode)
      this.addressFormGroup.controls['country'].setValue(data.country)
      this.addressFormGroup.controls['county'].setValue(data.county)
      this.addressFormGroup.controls['address_type_id'].setValue(
        data.address_type_id
      )
      this._loginStateService.loaderDisable()
    })
  }

  saveAddress() {
    this._loginStateService.loaderEnable()
    this.addressDetails = new AddressDetails(
      this.addressFormGroup.value.name,
      this.addressFormGroup.value.address_type_id,
      this.addressFormGroup.value.add1,
      this.addressFormGroup.value.town_city,
      this.addressFormGroup.value.county,
      this.addressFormGroup.value.country,
      this.addressFormGroup.value.postCode,
      this.addressFormGroup.value.add2,
      this.customer_id,
      this.id
    )
    this._addressDetailsService
      .putAddressDetails(this.addressDetails)
      .subscribe(_ => {
        this._loginStateService.loaderDisable()
        this.ngZone.run(() => this.router.navigate(['profile/address'])).then()
      })
  }

  cancelAddAddress() {
    this.ngZone.run(() => this.router.navigate(['profile/address'])).then()
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addressFormGroup.controls[controlName].hasError(errorName)
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { UpdateAttributeService } from '../services/authentication/update-attribute/update-attribute.service';
import { Registration } from '../services/authentication/helpers/registration';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  _profileService: ProfileService;
  panelOpenState = false
  viewMode: Boolean = true
  updateMode: Boolean = false

  _updatedAttribute: Boolean = false;

  attribute = {
    phone_number: null,
    name: null,
    email: null,
    sendMePromotions: "false",
    commViaEmail: "false"
  }

    //private _commViaSMS?: string,
    //private _personalisation?: string,

  private _updateAttributeService: UpdateAttributeService
  
  constructor(
    profileService: ProfileService,
    updateAttributeService: UpdateAttributeService
  ) { 
    this._profileService = profileService
    this._updateAttributeService = updateAttributeService
  }

  ngOnInit() {
    this.attribute.name = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.name
    this.attribute.phone_number = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.phone_number
    this.attribute.email = this._profileService.cognitoUser.getSignInUserSession().getIdToken().payload.email
  }
  edit() {
    console.log(this._profileService)
    this.viewMode = false
    this.updateMode = true
  }
  update() {
    this.viewMode = true
    this.updateMode = false

    console.log(this.attribute)
    let registrationUpdate: Registration = new Registration(
      this.attribute.phone_number,
      this.attribute.email,
      this.attribute.name,
      "",
      this.attribute.sendMePromotions,
      this.attribute.commViaEmail

    )
    this._updateAttributeService.attributeList = registrationUpdate.createUpdateAttributeList()
    const promise = this._updateAttributeService.updateAttributes()
    promise.then(value => {
      this._updatedAttribute = true;
      console.log(value) // response from successfull resolve
    }).catch(error => {
      this._updatedAttribute = false;
      console.log(error) // response from a graceful reject
    })
  }

}
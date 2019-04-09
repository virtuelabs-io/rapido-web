import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { UpdateAttributeService } from '../services/authentication/update-attribute/update-attribute.service';
import { Registration } from '../services/authentication/helpers/registration';
import { DeleteUserService } from '../services/authentication/delete-user/delete-user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  _profileService: ProfileService;
  panelOpenState = false
  viewMode: Boolean = true
  updateMode: Boolean = false

  _updatedAttribute: Boolean = false;
  private _deleteUserService: DeleteUserService

  attribute = {
    phone_number: null,
    name: null,
    email: null,
    sendMePromotions: "false",
    commViaEmail: "false"
  }

  accountItems = [
    {
      key: "name",
      value: "Anirup",
      button: "Edit"
    },
    {
      key: "Email",
      value: "Anirup",
      button: "Edit"
    },
    {
      key: "Mobile Number",
      value: "Anirup",
      button: "Edit"
    }
    
  ]
  private _updateAttributeService: UpdateAttributeService
  constructor(
    profileService: ProfileService,
    updateAttributeService: UpdateAttributeService,
    deleteUserService: DeleteUserService
  ) {
    this._profileService = profileService
    this._updateAttributeService = updateAttributeService
    this._deleteUserService = deleteUserService
  }

  ngOnInit() {
    let localAttributes = this.attribute
    // this._profileService.cognitoUser.getUserAttributes(function(err, result){
    //   if (err) {
    //   //  reject(new Response( 1, err.message, err ))
    //   }
    //   console.log(result)
    //   localAttributes.name = result[7].getValue()
    //   localAttributes.phone_number = result[8].getValue()
    //   localAttributes.email = result[10].getValue()
    // })
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

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/authentication/profile/profile.service';
import { UpdateAttributeService } from '../services/authentication/update-attribute/update-attribute.service';
import { Registration } from '../services/authentication/helpers/registration';
import { DeleteUserService } from '../services/authentication/delete-user/delete-user.service';
import { LoginStateService } from '../shared-services/login-state/login-state.service';

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
  deletedUser: Boolean = false
  failedToDelete: Boolean = false
  deleteButton: Boolean = false
  updateButton: Boolean = false
  deleteUserMsg: string = ""
  updatedAttribute: Boolean = false
  failedToUpdate: Boolean = false
  private _deleteUserService: DeleteUserService

  attribute = {
    phone_number: "",
    name: "",
    email: "",
    sendMePromotions: "",
    commViaEmail: "",
    commViaSMS: "",
    personalisation: "",
    sendMePromotionsB: false,
    commViaEmailB: false,
    commViaSMSB: false,
    personalisationB: false
  }
  private _updateAttributeService: UpdateAttributeService
  constructor(
    profileService: ProfileService,
    updateAttributeService: UpdateAttributeService,
    private loginStateService: LoginStateService,
    deleteUserService: DeleteUserService
  ) {
    this._profileService = profileService
    this._updateAttributeService = updateAttributeService
    this._deleteUserService = deleteUserService
  }

  ngOnInit() {
    this.fetchUserProfile()
  }

  fetchUserProfile() {
    let localAttributes = this.attribute
    this._profileService.cognitoUser.getUserAttributes(function(err, result) {
      for(var i = 0; i < result.length; i++) {
        if (localAttributes[result[i]["Name"].replace("custom:", "")] != null) {
          localAttributes[result[i]["Name"].replace("custom:", "")] = result[i].getValue()
        }
      }
      if(localAttributes.sendMePromotions == "true") {
        localAttributes.sendMePromotionsB = true
      }
      if(localAttributes.commViaEmail == "true") {
        localAttributes.commViaEmailB = true
      }
      if(localAttributes.commViaSMS == "true") {
        localAttributes.commViaSMSB = true
      }
      if(localAttributes.personalisation == "true") {
        localAttributes.personalisationB = true
      }
    })
  }

  edit() {
    this.viewMode = false
    this.updateMode = true
    this.updatedAttribute = false
  }

  update() {
    this.updateButton = true
    let registrationUpdate: Registration = new Registration(
      this.attribute.phone_number,
      this.attribute.email,
      this.attribute.name,
      "",
      "",
      this.attribute.sendMePromotionsB.toString(),
      this.attribute.commViaEmailB.toString(),
      this.attribute.commViaSMSB.toString(),
      this.attribute.personalisationB.toString(),
      ""
    )
    this._updateAttributeService.attributeList = registrationUpdate.createUpdateAttributeList()
    const promise = this._updateAttributeService.updateAttributes()
    promise.then(value => {
      this.fetchUserProfile()
      this.updateButton = false
      this.updatedAttribute = true
      this.viewMode = true
      this.updateMode = false
      this.failedToUpdate = false
    }).catch(error => {
      this.updateButton = false
      this.updatedAttribute = false
      this.failedToUpdate = true
    })
  }

  delete() {
    this.deleteButton = true
    const promise = this._deleteUserService.deleteUser()
    promise.then(value => {
      this.failedToDelete = false
      this.deleteButton = false
      this.deletedUser = true
      this.deleteUserMsg = 'Deleted user successfully'
      this.loginStateService.changeState(false)
    }).catch(error => {
      this.deleteButton = false
      this.deletedUser = false
      this.failedToDelete = true
    })
  }
}

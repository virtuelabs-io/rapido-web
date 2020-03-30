import { Component, OnInit } from '@angular/core'
import { ProfileService } from '../../services/authentication/profile/profile.service'
import { UpdateAttributeService } from '../../services/authentication/update-attribute/update-attribute.service'
import { Registration } from '../../services/authentication/helpers/registration'
import { DeleteUserService } from '../../services/authentication/delete-user/delete-user.service'
import { LoginStateService } from '../../shared-services/login-state/login-state.service'
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RouteService } from '../../shared-services/route/route.service'
import { SessionService } from '../../services/authentication/session/session.service'
import { Router } from '@angular/router'
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AccountInfoComponent implements OnInit {
  _profileService: ProfileService
  panelOpenState = false
  viewMode: Boolean = true
  updateMode: Boolean = false
  deletedUser: Boolean = false
  failedToDelete: Boolean = false
  deleteButton: Boolean = false
  updateButton: Boolean = false
  deleteUserMsg: string = ''
  updatedAttribute: Boolean = false
  failedToUpdate: Boolean = false
  isLoggedIn: Boolean
  dialogRef: any
  _modalReference = null
  private _deleteUserService: DeleteUserService

  attribute = {
    phone_number: '',
    name: '',
    email: '',
    sendMePromotions: '',
    commViaEmail: '',
    commViaSMS: '',
    personalisation: '',
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
    deleteUserService: DeleteUserService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private _sessionService: SessionService,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    public dialog: MatDialog
  ) {
    this._profileService = profileService
    this._updateAttributeService = updateAttributeService
    this._deleteUserService = deleteUserService
  }

  ngOnInit() {
    this.userLogInCheck()
  }

  async userLogInCheck() {
    await this.loginSessinExists()
      .then(_ => this.fetchUserProfile())
      .catch(err => this.handleError(err))
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      state => (this.isLoggedIn = state)
    )
  }

  async handleError(err) {
    this.RouteService.changeRoute('profile/account')
    this.router.navigateByUrl('/login')
  }

  async fetchUserProfile() {
    let localAttributes = this.attribute
    if (this.isLoggedIn) {
      await this._profileService.cognitoUser.getUserAttributes(function (
        err,
        result
      ) {
        if (result != null) {
          for (var i = 0; i < result.length; i++) {
            if (
              localAttributes[result[i]['Name'].replace('custom:', '')] != null
            ) {
              localAttributes[
                result[i]['Name'].replace('custom:', '')
              ] = result[i].getValue()
            }
          }
          if (localAttributes.sendMePromotions == 'true') {
            localAttributes.sendMePromotionsB = true
          }
          if (localAttributes.commViaEmail == 'true') {
            localAttributes.commViaEmailB = true
          }
          if (localAttributes.commViaSMS == 'true') {
            localAttributes.commViaSMSB = true
          }
          if (localAttributes.personalisation == 'true') {
            localAttributes.personalisationB = true
          }
        }
      })
    } else {
      await Promise.reject("Login Session doesn't exist!")
    }
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
      '',
      '',
      this.attribute.sendMePromotionsB.toString(),
      this.attribute.commViaEmailB.toString(),
      this.attribute.commViaSMSB.toString(),
      this.attribute.personalisationB.toString(),
      ''
    )
    this._updateAttributeService.attributeList = registrationUpdate.createUpdateAttributeList()
    const promise = this._updateAttributeService.updateAttributes()
    promise
      .then(_ => {
        this.fetchUserProfile() // to set value returned from the service
        this.updateButton = false
        this.updatedAttribute = true
        this.viewMode = true
        this.updateMode = false
        this.failedToUpdate = false
      })
      .catch(_ => {
        this.updateButton = false
        this.updatedAttribute = false
        this.failedToUpdate = true
      })
  }

  delete() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data:
        "Are you sure you want to delete the account. Once deleted, your account can't be recovered"
    })
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.yesModalAction()
      }
    })
  }

  yesModalAction() {
    this.deleteButton = true
    const promise = this._deleteUserService.deleteUser()
    promise
      .then(value => {
        this._modalReference.close()
        this.failedToDelete = false
        this.deleteButton = false
        this.deletedUser = true
        this.deleteUserMsg = 'Deleted user successfully'
        this.loginStateService.changeState(false)
      })
      .catch(error => {
        this.deleteButton = false
        this.deletedUser = false
        this.failedToDelete = true
      })
  }
}

import { Injectable } from "@angular/core"
import { GuestAddressDetails } from "./guest-address-details"
import { RapidoHttpService } from "../commons/rapido-http.service"
import { HttpClient } from "@angular/common/http"
import { ProfileService } from "../authentication/profile/profile.service"
import { Constants } from "../../utils/constants"

@Injectable({
  providedIn: "root",
})
export class GuestAddressService extends RapidoHttpService<
  GuestAddressDetails
> {
  constructor(
    protected _http?: HttpClient,
    protected _profileService?: ProfileService
  ) {
    super(_http, _profileService)
  }

  postGuestAddressDetails(guestAddressDetails: GuestAddressDetails) {
    return this.post(
      [
        Constants.GUESTS_APIS.api,
        localStorage.getItem(Constants.RAPIDO_SESSION_ID),
        "address",
      ].join("/"),
      guestAddressDetails
    )
  }
}

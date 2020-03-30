import { Component, OnInit } from '@angular/core'
import { Constants } from '../../utils/constants'

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  isConsentGranted: Boolean = false
  constructor() {}

  ngOnInit() {
    if (!localStorage.getItem(Constants.RAPIDO_COOKIES_PERMISSION)) {
      this.isConsentGranted = false
    } else {
      this.isConsentGranted = true
    }
  }

  handleCookieAcceptance() {
    localStorage.setItem(Constants.RAPIDO_COOKIES_PERMISSION, 'true')
    this.isConsentGranted = true
  }
}

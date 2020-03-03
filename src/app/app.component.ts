import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivationEnd  } from '@angular/router';
import { Config } from 'src/app/utils/config'
import { Constants } from './utils/constants';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cookieMessage: String = "This website uses cookies to ensure you get the best experience on our website"
  cookieDismiss: String = 'GOT IT'
  showNavBar: Boolean = true
  isConsentGranted: Boolean = false
  cookieLinkText: String = "Learn More"
  disclaimerReq: Boolean
  constructor(private router: Router,
    private pageScrollService: PageScrollService, 
    @Inject(DOCUMENT) private document: any){ }

  ngOnInit(){
    this.disclaimerReq = (Constants.environment.name == "STAGE" || Constants.environment.name == "DEV") ? true : false
    if (!localStorage.getItem(Constants.RAPIDO_COOKIES_PERMISSION)){
     // localStorage.setItem(Constants.RAPIDO_COOKIES_PERMISSION, uuid())
      this.isConsentGranted = false
    } else {
      this.isConsentGranted = true
    }

    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: '.nav-top',
    });
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof ActivationEnd ) {
        this.handleNavBarVisibility(event)
      }
  });
  }

  handleCookieAcceptance() {
    localStorage.setItem(Constants.RAPIDO_COOKIES_PERMISSION, uuid())
    this.isConsentGranted = true
  }

  handleNavBarVisibility(event){
    let navBarComponents = Config.COMPONENTS_WITHOUT_NAVBAR
    let componentName = event.snapshot.component.name
    if(navBarComponents.indexOf(componentName) === -1){
      this.showNavBar = true
    }else{
      this.showNavBar = false
    }
  }

  onActivate() {
    window.scroll(0,0);
  }
}

import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivationEnd  } from '@angular/router';
import { Config } from 'src/app/utils/config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cookieMessage: String = "This website uses cookies to ensure you get the best experience on our website"
  cookieDismiss: String = 'GOT IT'
  showNavBar: Boolean = true
  cookieLinkText: String = "Learn More"
  constructor(private router: Router,
    private pageScrollService: PageScrollService, 
    @Inject(DOCUMENT) private document: any){ }

  ngOnInit(){
    // // cookies implementation...
    // let cc = window as any;
    //    cc.cookieconsent.initialise({
    //      palette: {
    //        popup: {
    //          background: "#000"
    //        },
    //        button: {
    //          background: "#ffe000",//"#f2c811",
    //          text: "#164969"
    //        }
    //      },
    //      theme: "classic",
    //      content: {
    //        message: this.cookieMessage,
    //        dismiss: this.cookieDismiss,
    //        link: this.cookieLinkText
    //        //href: environment.Frontend + "/dataprivacy" 
    //      }
    //    });


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

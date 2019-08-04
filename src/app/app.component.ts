import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivationEnd  } from '@angular/router';
import { LoginStateService } from 'src/app/shared-services/login-state/login-state.service';
import { Config } from 'src/app/utils/config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // navBarComponents: Array<[]>
  constructor(private router: Router,
    private loginStateService: LoginStateService){ }

  ngOnInit(){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loginStateService.loaderEnable()
      }

      if (event instanceof NavigationEnd) {
        this.loginStateService.loaderDisable()
      }

      if (event instanceof NavigationError) {
        this.loginStateService.loaderDisable()
          console.log(event.error);
      }
      
      if (event instanceof ActivationEnd ) {
        this.handleNavBarVisibility(event)
      }
  });
  
  }

  handleNavBarVisibility(event){
    let navBarComponents = Config.COMPONENTS_WITHOUT_NAVBAR
    let componentName 
    debugger
    console.log(event)
    componentName = event.snapshot.component.name
    if(navBarComponents.indexOf(componentName) === -1){
      this.loginStateService.showNavBar()
    }else{
      this.loginStateService.hideNavBar()
    }
  }

}

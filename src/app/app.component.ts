import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivationEnd  } from '@angular/router';
import { LoginStateService } from 'src/app/shared-services/login-state/login-state.service';


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
    let navBarComponents = ['RegisterComponent','LogInComponent','CheckoutComponent','ForgotPasswordComponent']
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

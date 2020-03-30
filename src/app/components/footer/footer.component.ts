import { Component, OnInit, NgZone } from '@angular/core';
import { Constants } from '../../utils/constants';
import { Router } from '@angular/router';
import { RouteService } from '../../shared-services/route/route.service';
import { LoginStateService } from '../../shared-services/login-state/login-state.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isSignedIn: Boolean = false;
  name: String;
  bannerName: String = Constants.RAPIDO_BUILD;
  durationInSeconds = 5;
  isLoggedIn: Boolean;
  deployedVersion = Constants.environment.version;
  constructor(
    public router: Router,
    private RouteService: RouteService,
    private _loginStateService: LoginStateService,
    private ngZone: NgZone
  ) {}
  ngOnInit() {}

  handleHelpNaviagte() {
    this.RouteService.changeRoute('questionnaire');
    this.ngZone.run(() => this.router.navigate(['profile'])).then();
  }

  handleProfileNavigate() {
    this.userLogInCheck();
  }

  async userLogInCheck() {
    await this.loginSessinExists()
      .then(async _ => {
        if (this.isLoggedIn) {
          this.ngZone.run(() => this.router.navigate(['profile'])).then();
        } else {
          await Promise.reject("Login Session doesn't exist!");
        }
      })
      .catch(err => this.handleError(err));
  }

  async loginSessinExists() {
    await this._loginStateService.isLoggedInState.subscribe(
      state => (this.isLoggedIn = state)
    );
  }

  async handleError(err) {
    this.RouteService.changeRoute('profile');
    this.router.navigateByUrl('/login');
  }
}

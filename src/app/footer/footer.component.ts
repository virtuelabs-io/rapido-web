import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';
import { RouteService } from '../shared-services/route/route.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isSignedIn: Boolean = false
  name: String
  bannerName: String = Constants.RAPIDO_BUILD
  durationInSeconds = 5;
  deployedVersion = Constants.environment.version;
  constructor(
    public router: Router,
    private RouteService : RouteService
  ) { }
  ngOnInit() {}

  handleHelpNaviagte() {
    this.RouteService.changeRoute('questionnaire')
    this.router.navigateByUrl('/profile')
  }
}

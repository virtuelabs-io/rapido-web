import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }
  ngOnInit() {}
}

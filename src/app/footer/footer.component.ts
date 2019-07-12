import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';

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
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../src/app/utils/constants';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() imgSrc
  constructor() { }

  ngOnInit() {
    if(this.imgSrc){
      this.imgSrc = 'https://cdn.aws.toolstation.com/images/141020-UK/800/73722.jpg'
      // this.imgSrc = Constants.environment.staticAssets + this.imgSrc[0]
    }
  }
}

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
    this.imgSrc = Constants.environment.staticAssets + this.imgSrc[0]
    console.log(this.imgSrc)
  }

}

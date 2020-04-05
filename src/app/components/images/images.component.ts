import { Component, OnInit, Input } from '@angular/core';
import { Common } from '../../../../src/app/utils/common';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() imgSrc
  @Input() imgTitle
  constructor() { }

  ngOnInit() {
    if(this.imgSrc){
      this.imgSrc = Common.getImageURI(this.imgSrc[0])
    }
  }
}

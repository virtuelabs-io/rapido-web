import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  @Input() imgSrc:string = "https://cdn.aws.toolstation.com/images/141020-UK/250/88614.jpg"
  constructor() { }

  ngOnInit() {
  }

}

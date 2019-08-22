import { Component, OnInit } from '@angular/core';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-press-release',
  templateUrl: './press-release.component.html',
  styleUrls: ['./press-release.component.scss']
})
export class PressReleaseComponent implements OnInit {
  imageUrl: string =  Constants.environment.staticAssets+'/images/press-release.jpg'

  constructor() { }

  ngOnInit() {
  }

}

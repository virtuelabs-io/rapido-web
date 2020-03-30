import { Component, OnInit } from '@angular/core'
import { Common } from '../../../../../src/app/utils/common'

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  images = [
    Common.getImageURI(null, '/images/home-page/image_car4.jpg'),
    Common.getImageURI(null, '/images/home-page/image_car2.jpg'),
    Common.getImageURI(null, '/images/home-page/image_car3.jpg')
  ]
  pauseOnHover: any
  constructor() {}
  ngOnInit() {}
}

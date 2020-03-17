import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  images = ['/assets/images/image_car5.jpg','/assets/images/image_car4.jpg','/assets/images/image_car2.jpg','/assets/images/image_car3.jpg']
  constructor() { }

  ngOnInit() {
  }
}
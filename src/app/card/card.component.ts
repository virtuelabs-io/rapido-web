import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  itemDetails: any
  actualPrice: any
  discountedPrice: any
  images: any
  name: any
  price: any
  offer: any
  rating: any
  Math: any
  @Input() itemList
  constructor() { }

  ngOnInit() {
    if(this.itemList){
      this.itemDetails = this.itemList.fields
        if(this.itemDetails && this.itemDetails.offer && this.itemDetails.offer === 0){
          this.actualPrice = (Math.round(this.itemDetails.price * this.itemDetails.offer * 1000)) / 100
        }else{
          this.actualPrice = this.itemDetails.price
        }
      this.discountedPrice = this.itemDetails.price - this.actualPrice
      this.images = this.itemDetails && this.itemDetails.images
      this.name = this.itemDetails && this.itemDetails.name
      this.price = this.itemDetails && this.itemDetails.price
      this.offer = this.itemDetails && this.itemDetails.offer
      this.rating = this.itemDetails && this.itemDetails.rating
    }
  }
}

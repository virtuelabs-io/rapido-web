import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  itemDetails: any = {
    'price':'',
    'offer':'',
    'name':'',
    'images':'',
    'rating':''
  }
  mrpPrice: any
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
      this.mrpPrice = (this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))).toFixed(2)
      this.discountedPrice = (this.mrpPrice - this.itemDetails.price).toFixed(2)
    }
  }
}

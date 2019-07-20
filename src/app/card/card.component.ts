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
  Math: any;
  @Input() itemList
  constructor() { }

  ngOnInit() {
    if(this.itemList){
      this.itemDetails = this.itemList.fields
    }
    this.actualPrice = this.itemDetails.offer === 0 ? (Math.round(this.itemDetails.price * this.itemDetails.offer * 1000)) / 100 : this.itemDetails.price
    this.discountedPrice = this.itemDetails.price - (this.itemDetails.offer === 0 ? (Math.round(this.itemDetails.price * this.itemDetails.offer * 1000)) / 100 : this.itemDetails.price)
  }
}

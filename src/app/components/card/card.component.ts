import { Component, OnInit, Input } from '@angular/core';


interface IItemDetails {
  fields :{
    price:string;
    offer:string;
    name:string;
    images:string;
    rating:string;
    currency:string;
  };
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  mrpPrice: number
  discountedPrice: number
  itemDetails: IItemDetails["fields"]
  currencySymbol: string
  @Input() itemList:IItemDetails

  ngOnInit() {
    if(this.itemList){
      this.itemDetails = this.itemList.fields
      this.mrpPrice = +this.itemDetails.price * (1 + parseFloat(this.itemDetails.offer))
      this.discountedPrice = this.mrpPrice - +this.itemDetails.price
      this.currencySymbol = this.itemList.fields.currency
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  itemDetails: Object
  @Input() itemList//:Object<{fields:Object}>
  constructor() { }

  ngOnInit() {
    if(this.itemList){
      this.itemDetails = this.itemList.fields
    }
  }

}

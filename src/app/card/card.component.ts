import { Component, OnInit, Input } from '@angular/core';
import { WindowService } from '../services/window.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  itemDetails: any
  Math: any;
  @Input() itemList
  constructor(private win: WindowService) { }

  ngOnInit() {
    if(this.itemList){
      this.itemDetails = this.itemList.fields
    }
    // this.Math = this.win.windowRef && this.win.windowRef.Math
  }

}

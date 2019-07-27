import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  @Input()  cardDetails
  constructor() { }

  ngOnInit() {
    console.log(this.cardDetails)
  }

}

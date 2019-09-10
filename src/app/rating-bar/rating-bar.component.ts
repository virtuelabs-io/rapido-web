import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {
  @Input()  rate = {
    field: "",
    rate: ""
  }
  constructor() { }

  ngOnInit() {
  }

}

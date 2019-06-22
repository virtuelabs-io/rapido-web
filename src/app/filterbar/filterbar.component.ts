import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent implements OnInit {

  @Input() searchedText:string=""
  // @Input() responseData:Object
  constructor() { }

  ngOnInit() {

  }

}

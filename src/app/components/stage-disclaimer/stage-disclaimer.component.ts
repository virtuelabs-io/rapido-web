import { Component, OnInit } from '@angular/core';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-stage-disclaimer',
  templateUrl: './stage-disclaimer.component.html',
  styleUrls: ['./stage-disclaimer.component.scss']
})
export class StageDisclaimerComponent implements OnInit {
  disclaimerReq: Boolean
  constructor() { }

  ngOnInit() {    
    this.disclaimerReq = (Constants.environment.name == "STAGE" || Constants.environment.name == "DEV") ? true : false
  }

}

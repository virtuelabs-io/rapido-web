import { Component, OnInit } from '@angular/core';
import { ResendOtpService } from '../shared-services/resend-otp/resend-otp.services';

@Component({
  selector: 'app-resend-otp',
  templateUrl: './resend-otp.component.html',
  styleUrls: ['./resend-otp.component.scss']
})
export class ResendOtpComponent implements OnInit {

  constructor(
    private _resendOtpService : ResendOtpService
  ) { }

  ngOnInit() {
    this._resendOtpService.currentState.subscribe(state => {
      console.log(state)
    })


    
    
  }

}

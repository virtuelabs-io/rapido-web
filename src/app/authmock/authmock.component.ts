import { AuthenticationService } from './../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Registration } from '../services/authentication/objects/registration';

@Component({
  selector: 'app-authmock',
  templateUrl: './authmock.component.html',
  styleUrls: ['./authmock.component.scss']
})
export class AuthmockComponent implements OnInit {

  private registration: Registration = new Registration(
    "+447783307487",
    "reddy.horcrux@gmail.com",
    "Sangram Reddy",
    "Sangram1992",
    "true",
    "true",
    "true",
    "true",
    "true"
  );
  private userRegistered: Boolean = false;

  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  ngOnInit() {
  }

  private registerUser(){
    this.registration.createAttributeList();
    let user = {
      phone_number: this.registration.phone_number,
      password: this.registration.password,
      attributeList: this.registration.attributeList
    };
    this.userRegistered = this.authenticationService.signUp(user);
  }
}

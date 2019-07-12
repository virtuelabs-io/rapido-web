import { Injectable } from '@angular/core';
import { RapidoHttpService } from '../commons/rapido-http.service';
import { CartItem } from './cart-item';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../authentication/profile/profile.service';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CartService extends RapidoHttpService<CartItem> {

  constructor(protected _http: HttpClient, protected _profileService: ProfileService) {
    super(_http, _profileService)
  }
}

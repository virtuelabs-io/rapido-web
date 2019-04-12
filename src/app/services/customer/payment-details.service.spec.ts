import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { PaymentDetailsService } from './payment-details.service';
import { ProfileService } from '../authentication/profile/profile.service';

describe('AddressDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ ProfileService ]
  })
);

  it('should be created', () => {
    const service: PaymentDetailsService = TestBed.get(PaymentDetailsService);
    expect(service).toBeTruthy();
  });
});
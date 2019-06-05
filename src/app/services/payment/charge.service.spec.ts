import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ChargeService } from './charge.service';
import { ProfileService } from '../authentication/profile/profile.service';

describe('ChargeService', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProfileService ]
    })
  );

  it('should be created', () => {
    const service: ChargeService = TestBed.get(ChargeService);
    expect(service).toBeTruthy();
  });
});

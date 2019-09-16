import { TestBed } from '@angular/core/testing';
import { ProfileService } from '../authentication/profile/profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GuestOrdersService } from './guest-orders.service';

describe('GuestOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ ProfileService ]
  })
);

  it('should be created', () => {
    const service: GuestOrdersService = TestBed.get(GuestOrdersService);
    expect(service).toBeTruthy();
  });
});

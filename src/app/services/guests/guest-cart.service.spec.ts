import { TestBed } from '@angular/core/testing'
import { ProfileService } from '../authentication/profile/profile.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GuestCartService } from './guest-cart.service'

describe('GuestCartService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    })
  )

  it('should be created', () => {
    const service: GuestCartService = TestBed.get(GuestCartService)
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'
import { ProfileService } from '../authentication/profile/profile.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GuestChargeService } from './guest-charge.service'

describe('GuestChargeService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    })
  )

  it('should be created', () => {
    const service: GuestChargeService = TestBed.get(GuestChargeService)
    expect(service).toBeTruthy()
  })
})

import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RatingsService } from './ratings.service'
import { ProfileService } from '../authentication/profile/profile.service'

describe('RatingsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    })
  )

  it('should be created', () => {
    const service: RatingsService = TestBed.get(RatingsService)
    expect(service).toBeTruthy()
  })
})

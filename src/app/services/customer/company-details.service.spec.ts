import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CompanyDetailsService } from './company-details.service'
import { ProfileService } from '../authentication/profile/profile.service'

describe('CompanyDetailsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    })
  )

  it('should be created', () => {
    const service: CompanyDetailsService = TestBed.get(CompanyDetailsService)
    expect(service).toBeTruthy()
  })
})

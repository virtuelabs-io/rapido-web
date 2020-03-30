import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OrdersService } from './orders.service'
import { ProfileService } from '../authentication/profile/profile.service'

describe('OrdersService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    })
  )

  it('should be created', () => {
    const service: OrdersService = TestBed.get(OrdersService)
    expect(service).toBeTruthy()
  })
})

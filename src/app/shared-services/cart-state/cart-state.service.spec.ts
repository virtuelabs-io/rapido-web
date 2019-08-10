import { TestBed } from '@angular/core/testing';
import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { CartStateService } from './cart-state.service';

describe('CartStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: CartStateService = TestBed.get(CartStateService);
    expect(service).toBeTruthy();
  });
});

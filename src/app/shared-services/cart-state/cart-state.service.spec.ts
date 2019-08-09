import { TestBed } from '@angular/core/testing';

import { CartStateService } from './cart-state.service';

describe('CartStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartStateService = TestBed.get(CartStateService);
    expect(service).toBeTruthy();
  });
});

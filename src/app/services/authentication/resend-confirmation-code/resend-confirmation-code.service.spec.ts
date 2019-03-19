import { TestBed } from '@angular/core/testing';

import { ResendConfirmationCodeService } from './resend-confirmation-code.service';

describe('ResendConfirmationCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResendConfirmationCodeService = TestBed.get(ResendConfirmationCodeService);
    expect(service).toBeTruthy();
  });
});

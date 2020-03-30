import { TestBed } from '@angular/core/testing';

import { ConfirmRegistrationService } from './confirm-registration.service';

describe('ConfirmUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmRegistrationService = TestBed.get(
      ConfirmRegistrationService
    );
    expect(service).toBeTruthy();
  });
});

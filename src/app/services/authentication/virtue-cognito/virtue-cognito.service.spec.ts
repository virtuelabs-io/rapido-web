import { TestBed } from '@angular/core/testing';

import { VirtueCognitoService } from './virtue-cognito.service';

describe('VirtueCognitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtueCognitoService = TestBed.get(VirtueCognitoService);
    expect(service).toBeTruthy();
  });
});

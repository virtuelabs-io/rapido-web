import { TestBed } from '@angular/core/testing';

import { RapidoCognitoService } from './rapido-cognito.service'

describe('RapidoCognitoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapidoCognitoService = TestBed.get(RapidoCognitoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { VirtueCognitoService } from '../virtue-cognito/virtue-cognito.service';
import { environment as testEnvironment } from '../../../../environments/environment.test';
import { CognitoUser } from 'amazon-cognito-identity-js';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });

  it('Test initializeProfileUsingUserData', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    const virtueCognitoService: VirtueCognitoService = TestBed.get(VirtueCognitoService)
    service.initializeProfileUsingUserData({
      Username: testEnvironment.phone_number,
      Pool: virtueCognitoService.cognitoUserPool
    })
    expect(service.cognitoUser).toEqual(jasmine.any(CognitoUser))
  });
});

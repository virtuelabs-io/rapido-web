import { TestBed } from "@angular/core/testing";

import { AuthenticationService } from "./authentication.service";
import { ProfileService } from "../profile/profile.service";
import { VirtueCognitoService } from "../virtue-cognito/virtue-cognito.service";
import { CognitoUser } from "amazon-cognito-identity-js";

describe("AuthenticationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it("Setter and getter for Username", () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    service.username = "+440000000000";
    expect(service.username).toEqual("+440000000000");
  });

  it("prepareProfile test: Positive", () => {
    class TestAuthenticationService extends AuthenticationService {
      constructor(
        profileService: ProfileService,
        virtueCognitoService: VirtueCognitoService
      ) {
        super(profileService, virtueCognitoService);
      }

      public testPrepareProfile() {
        this.prepareProfile();
        return this._userProfile.cognitoUser;
      }
    }
    let service = new TestAuthenticationService(
      new ProfileService(),
      new VirtueCognitoService()
    );
    service.username = "+440000000000";
    let cognitoUser = service.testPrepareProfile();
    expect(cognitoUser).toBeDefined();
    expect(cognitoUser).toEqual(jasmine.any(CognitoUser));
  });

  it("prepareProfile test: Negative", () => {
    class TestAuthenticationService extends AuthenticationService {
      constructor(
        profileService: ProfileService,
        virtueCognitoService: VirtueCognitoService
      ) {
        super(profileService, virtueCognitoService);
      }

      public testPrepareProfile() {
        this.prepareProfile();
        return this._userProfile.cognitoUser;
      }
    }
    let service = new TestAuthenticationService(
      new ProfileService(),
      new VirtueCognitoService()
    );
    expect(function () {
      service.testPrepareProfile();
    }).toThrowError(
      "Username is not set for the authentication service. Please try to use <service>.username = <username>"
    );
  });

  it("initializeNewProfile test: Positive", () => {
    class TestAuthenticationService extends AuthenticationService {
      constructor(
        profileService: ProfileService,
        virtueCognitoService: VirtueCognitoService
      ) {
        super(profileService, virtueCognitoService);
      }

      public testInitializeNewProfile() {
        this.initializeNewProfile();
        return this._userProfile.cognitoUser;
      }
    }
    let service = new TestAuthenticationService(
      new ProfileService(),
      new VirtueCognitoService()
    );
    service.username = "+440000000000";
    let cognitoUser = service.testInitializeNewProfile();
    expect(cognitoUser).toBeDefined();
    expect(cognitoUser).toEqual(jasmine.any(CognitoUser));
  });

  it("initializeNewProfile test: Negative", () => {
    class TestAuthenticationService extends AuthenticationService {
      constructor(
        profileService: ProfileService,
        virtueCognitoService: VirtueCognitoService
      ) {
        super(profileService, virtueCognitoService);
      }

      public testInitializeNewProfile() {
        this.initializeNewProfile();
        return this._userProfile.cognitoUser;
      }
    }
    let service = new TestAuthenticationService(
      new ProfileService(),
      new VirtueCognitoService()
    );
    expect(function () {
      service.testInitializeNewProfile();
    }).toThrowError(
      "Username is not set for the authentication service. Please try to use <service>.username = <username>"
    );
  });
});

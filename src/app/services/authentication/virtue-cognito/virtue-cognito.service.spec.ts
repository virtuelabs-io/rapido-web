import { TestBed } from "@angular/core/testing"

import { VirtueCognitoService } from "./virtue-cognito.service"
import { Constants } from "../../../utils/constants"
import { CognitoUserPool } from "amazon-cognito-identity-js"

describe("VirtueCognitoService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [VirtueCognitoService],
    })
  )

  it("should be created", () => {
    const service: VirtueCognitoService = TestBed.get(VirtueCognitoService)
    expect(service).toBeTruthy()
  })

  it("Cognito userPool clientId to match the Constants", () => {
    const service: VirtueCognitoService = TestBed.get(VirtueCognitoService)
    expect(service.cognitoUserPool.getClientId()).toEqual(
      Constants.POOL_DATA.ClientId
    )
  })

  it("Cognito userPool UserPoolId to match the Constants", () => {
    const service: VirtueCognitoService = TestBed.get(VirtueCognitoService)
    expect(service.cognitoUserPool.getUserPoolId()).toEqual(
      Constants.POOL_DATA.UserPoolId
    )
  })

  it("Cognito userUserPool to match", () => {
    const service: VirtueCognitoService = TestBed.get(VirtueCognitoService)
    expect(service.cognitoUserPool).toEqual(
      new CognitoUserPool(Constants.POOL_DATA)
    )
  })
})

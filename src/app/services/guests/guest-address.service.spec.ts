import { TestBed } from "@angular/core/testing"
import { ProfileService } from "../authentication/profile/profile.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { GuestAddressService } from "./guest-address.service"

describe("GuestAddressService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    })
  )

  it("should be created", () => {
    const service: GuestAddressService = TestBed.get(GuestAddressService)
    expect(service).toBeTruthy()
  })
})

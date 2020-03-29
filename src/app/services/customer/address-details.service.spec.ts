import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AddressDetailsService } from "./address-details.service";
import { ProfileService } from "../authentication/profile/profile.service";

describe("AddressDetailsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    })
  );

  it("should be created", () => {
    const service: AddressDetailsService = TestBed.get(AddressDetailsService);
    expect(service).toBeTruthy();
  });
});

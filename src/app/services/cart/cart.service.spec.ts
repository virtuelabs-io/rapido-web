import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CartService } from "./cart.service";
import { ProfileService } from "../authentication/profile/profile.service";

describe("CartService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    })
  );

  it("should be created", () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from "@angular/core/testing";

import { SearchItemService } from "./search-item.services";

describe("SearchItemService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SearchItemService = TestBed.get(SearchItemService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from "@angular/core/testing";

import { DynamicSupportService } from "./dynamic-support.service";

describe("DynamicSupportService", () => {
  let service: DynamicSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicSupportService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

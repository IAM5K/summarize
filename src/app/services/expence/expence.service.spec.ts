import { TestBed } from '@angular/core/testing';

import { ExpenceService } from './expence.service';

describe('ExpenceService', () => {
  let service: ExpenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

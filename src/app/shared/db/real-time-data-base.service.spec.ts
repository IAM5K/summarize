import { TestBed } from '@angular/core/testing';

import { RealTimeDataBaseService } from './real-time-data-base.service';

describe('RealTimeDataBaseService', () => {
  let service: RealTimeDataBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeDataBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

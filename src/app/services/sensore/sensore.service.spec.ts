import { TestBed } from '@angular/core/testing';

import { SensoreService } from './sensore.service';

describe('SensoreService', () => {
  let service: SensoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

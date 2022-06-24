import { TestBed } from '@angular/core/testing';

import { AbbonamentiService } from './abbonamenti.service';

describe('AbbonamentiService', () => {
  let service: AbbonamentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbbonamentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

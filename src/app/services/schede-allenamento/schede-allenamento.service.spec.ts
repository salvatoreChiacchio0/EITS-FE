import { TestBed } from '@angular/core/testing';

import { SchedeAllenamentoService } from './schede-allenamento.service';

describe('SchedeAllenamentoService', () => {
  let service: SchedeAllenamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedeAllenamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

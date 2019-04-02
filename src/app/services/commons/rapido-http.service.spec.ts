import { TestBed } from '@angular/core/testing';

import { RapidoHttpService } from './rapido-http.service';

describe('RapidoHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapidoHttpService<string> = TestBed.get(RapidoHttpService);
    expect(service).toBeTruthy();
  });
});

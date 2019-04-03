import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RapidoHttpService } from './rapido-http.service';

describe('RapidoHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: RapidoHttpService<string> = TestBed.get(RapidoHttpService);
    expect(service).toBeTruthy();
  });
});

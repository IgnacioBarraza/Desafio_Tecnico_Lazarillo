import { TestBed } from '@angular/core/testing';

import { NominatimService } from './osm.service';

describe('NominatimService', () => {
  let service: NominatimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominatimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

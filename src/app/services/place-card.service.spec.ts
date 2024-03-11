import { TestBed } from '@angular/core/testing';

import { PlaceCardService } from './place-card.service';

describe('PlaceCardService', () => {
  let service: PlaceCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

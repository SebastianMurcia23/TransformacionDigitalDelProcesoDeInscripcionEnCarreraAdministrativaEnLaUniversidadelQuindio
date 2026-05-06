import { TestBed } from '@angular/core/testing';

import { ParCarsol } from './par-carsol';

describe('ParCarsol', () => {
  let service: ParCarsol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParCarsol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

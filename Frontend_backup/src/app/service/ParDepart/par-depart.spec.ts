import { TestBed } from '@angular/core/testing';

import { ParDepart } from './par-depart';

describe('ParDepart', () => {
  let service: ParDepart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParDepart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

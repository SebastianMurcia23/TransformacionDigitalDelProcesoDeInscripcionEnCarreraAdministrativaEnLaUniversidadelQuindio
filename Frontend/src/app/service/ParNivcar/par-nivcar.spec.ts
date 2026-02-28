import { TestBed } from '@angular/core/testing';

import { ParNivcar } from './par-nivcar';

describe('ParNivcar', () => {
  let service: ParNivcar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParNivcar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ParPaises } from './par-paises';

describe('ParPaises', () => {
  let service: ParPaises;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParPaises);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

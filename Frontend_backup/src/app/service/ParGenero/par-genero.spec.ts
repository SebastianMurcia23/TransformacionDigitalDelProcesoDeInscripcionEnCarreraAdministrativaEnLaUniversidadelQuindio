import { TestBed } from '@angular/core/testing';

import { ParGenero } from './par-genero';

describe('ParGenero', () => {
  let service: ParGenero;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParGenero);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

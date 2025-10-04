import { TestBed } from '@angular/core/testing';

import { ParTipdoc } from './par-tipdoc';

describe('ParTipdoc', () => {
  let service: ParTipdoc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParTipdoc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

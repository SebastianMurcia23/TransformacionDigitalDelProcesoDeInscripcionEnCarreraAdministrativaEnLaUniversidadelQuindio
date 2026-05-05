import { TestBed } from '@angular/core/testing';

import { ParTipsol } from './par-tipsol';

describe('ParTipsol', () => {
  let service: ParTipsol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParTipsol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

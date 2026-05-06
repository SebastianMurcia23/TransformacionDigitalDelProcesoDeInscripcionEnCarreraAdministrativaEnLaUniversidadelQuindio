import { TestBed } from '@angular/core/testing';

import { ProFuncio } from './pro-funcio';

describe('ProFuncio', () => {
  let service: ProFuncio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProFuncio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

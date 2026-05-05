import { TestBed } from '@angular/core/testing';

import { DesCar } from './des-car';

describe('DesCar', () => {
  let service: DesCar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesCar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

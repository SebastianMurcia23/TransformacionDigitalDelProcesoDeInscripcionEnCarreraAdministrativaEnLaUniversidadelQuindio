import { TestBed } from '@angular/core/testing';

import { DenCar } from './den-car';

describe('DenCar', () => {
  let service: DenCar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenCar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProAnotacionService } from './pro-anotacion.service';

describe('ProAnotacionService', () => {
  let service: ProAnotacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProAnotacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

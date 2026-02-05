import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivCar } from './niv-car';

describe('NivCar', () => {
  let component: NivCar;
  let fixture: ComponentFixture<NivCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NivCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

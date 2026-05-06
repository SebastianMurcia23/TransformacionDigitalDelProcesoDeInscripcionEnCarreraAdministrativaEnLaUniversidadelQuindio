import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenCar } from './den-car';

describe('DenCar', () => {
  let component: DenCar;
  let fixture: ComponentFixture<DenCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesCar } from './des-car';

describe('DesCar', () => {
  let component: DesCar;
  let fixture: ComponentFixture<DesCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

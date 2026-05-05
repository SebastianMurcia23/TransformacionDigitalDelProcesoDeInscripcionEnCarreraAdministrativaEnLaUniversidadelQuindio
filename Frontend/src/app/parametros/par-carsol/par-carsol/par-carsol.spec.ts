import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParCarsol } from './par-carsol';

describe('ParCarsol', () => {
  let component: ParCarsol;
  let fixture: ComponentFixture<ParCarsol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParCarsol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParCarsol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

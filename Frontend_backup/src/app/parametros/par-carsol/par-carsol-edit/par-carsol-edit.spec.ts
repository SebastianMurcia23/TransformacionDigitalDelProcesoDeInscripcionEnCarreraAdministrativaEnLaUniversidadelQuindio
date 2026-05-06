import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParCarsolEdit } from './par-carsol-edit';

describe('ParCarsolEdit', () => {
  let component: ParCarsolEdit;
  let fixture: ComponentFixture<ParCarsolEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParCarsolEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParCarsolEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

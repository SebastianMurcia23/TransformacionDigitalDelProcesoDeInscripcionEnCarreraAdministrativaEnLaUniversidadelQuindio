import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParCarsolInsert } from './par-carsol-insert';

describe('ParCarsolInsert', () => {
  let component: ParCarsolInsert;
  let fixture: ComponentFixture<ParCarsolInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParCarsolInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParCarsolInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

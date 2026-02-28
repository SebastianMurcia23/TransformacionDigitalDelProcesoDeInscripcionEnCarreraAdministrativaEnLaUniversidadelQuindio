import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParNivcarEdit } from './par-nivcar-edit';

describe('ParNivcarEdit', () => {
  let component: ParNivcarEdit;
  let fixture: ComponentFixture<ParNivcarEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParNivcarEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParNivcarEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

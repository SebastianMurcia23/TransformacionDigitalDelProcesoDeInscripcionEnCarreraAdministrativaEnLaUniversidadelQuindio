import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipsolEdit } from './par-tipsol-edit';

describe('ParTipsolEdit', () => {
  let component: ParTipsolEdit;
  let fixture: ComponentFixture<ParTipsolEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipsolEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipsolEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

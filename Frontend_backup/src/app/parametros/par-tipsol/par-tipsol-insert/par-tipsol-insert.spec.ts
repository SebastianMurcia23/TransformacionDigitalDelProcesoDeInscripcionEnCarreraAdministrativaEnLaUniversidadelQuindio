import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipsolInsert } from './par-tipsol-insert';

describe('ParTipsolInsert', () => {
  let component: ParTipsolInsert;
  let fixture: ComponentFixture<ParTipsolInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipsolInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipsolInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

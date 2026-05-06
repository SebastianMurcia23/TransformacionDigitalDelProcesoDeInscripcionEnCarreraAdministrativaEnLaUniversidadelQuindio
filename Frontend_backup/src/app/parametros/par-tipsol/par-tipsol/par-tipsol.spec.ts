import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipsol } from './par-tipsol';

describe('ParTipsol', () => {
  let component: ParTipsol;
  let fixture: ComponentFixture<ParTipsol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipsol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipsol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

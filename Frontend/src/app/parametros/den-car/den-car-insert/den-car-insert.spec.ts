import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenCarInsert } from './den-car-insert';

describe('DenCarInsert', () => {
  let component: DenCarInsert;
  let fixture: ComponentFixture<DenCarInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenCarInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenCarInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

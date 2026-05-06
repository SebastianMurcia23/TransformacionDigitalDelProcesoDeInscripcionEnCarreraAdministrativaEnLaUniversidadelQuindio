import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenCarEdit } from './den-car-edit';

describe('DenCarEdit', () => {
  let component: DenCarEdit;
  let fixture: ComponentFixture<DenCarEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenCarEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenCarEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

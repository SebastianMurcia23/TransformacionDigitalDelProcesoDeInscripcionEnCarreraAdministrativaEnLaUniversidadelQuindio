import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesCarEdit } from './des-car-edit';

describe('DesCarEdit', () => {
  let component: DesCarEdit;
  let fixture: ComponentFixture<DesCarEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesCarEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesCarEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

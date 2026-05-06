import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesCarInsert } from './des-car-insert';

describe('DesCarInsert', () => {
  let component: DesCarInsert;
  let fixture: ComponentFixture<DesCarInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesCarInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesCarInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

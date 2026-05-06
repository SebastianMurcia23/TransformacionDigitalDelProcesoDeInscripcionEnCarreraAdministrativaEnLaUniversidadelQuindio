import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivCarInsert } from './niv-car-insert';

describe('NivCarInsert', () => {
  let component: NivCarInsert;
  let fixture: ComponentFixture<NivCarInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NivCarInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivCarInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

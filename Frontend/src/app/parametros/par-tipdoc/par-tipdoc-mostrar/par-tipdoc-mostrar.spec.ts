import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipdocMostrar } from './par-tipdoc-mostrar';

describe('ParTipdocMostrar', () => {
  let component: ParTipdocMostrar;
  let fixture: ComponentFixture<ParTipdocMostrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipdocMostrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipdocMostrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcAnotaciones } from './proc-anotaciones';

describe('ProcAnotaciones', () => {
  let component: ProcAnotaciones;
  let fixture: ComponentFixture<ProcAnotaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcAnotaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcAnotaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

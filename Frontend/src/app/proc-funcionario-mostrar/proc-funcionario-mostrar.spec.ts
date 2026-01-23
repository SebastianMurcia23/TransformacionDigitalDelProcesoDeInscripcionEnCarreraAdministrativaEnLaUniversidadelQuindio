import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcFuncionarioMostrar } from './proc-funcionario-mostrar';

describe('ProcFuncionarioMostrar', () => {
  let component: ProcFuncionarioMostrar;
  let fixture: ComponentFixture<ProcFuncionarioMostrar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcFuncionarioMostrar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcFuncionarioMostrar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

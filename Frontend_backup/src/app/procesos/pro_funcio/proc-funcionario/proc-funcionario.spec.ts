import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcFuncionario } from './proc-funcionario';

describe('ProcFuncionario', () => {
  let component: ProcFuncionario;
  let fixture: ComponentFixture<ProcFuncionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcFuncionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcFuncionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

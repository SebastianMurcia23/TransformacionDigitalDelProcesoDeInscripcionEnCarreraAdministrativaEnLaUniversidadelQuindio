import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcFuncionarioEdit } from './proc-funcionario-edit';

describe('ProcFuncionarioEdit', () => {
  let component: ProcFuncionarioEdit;
  let fixture: ComponentFixture<ProcFuncionarioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcFuncionarioEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcFuncionarioEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

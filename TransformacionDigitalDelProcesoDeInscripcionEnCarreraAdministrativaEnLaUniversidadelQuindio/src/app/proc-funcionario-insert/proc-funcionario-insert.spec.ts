import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcFuncionarioInsert } from './proc-funcionario-insert';

describe('ProcFuncionarioInsert', () => {
  let component: ProcFuncionarioInsert;
  let fixture: ComponentFixture<ProcFuncionarioInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcFuncionarioInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcFuncionarioInsert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

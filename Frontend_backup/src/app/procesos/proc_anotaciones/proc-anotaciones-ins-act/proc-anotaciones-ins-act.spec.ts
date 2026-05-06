import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcAnotacionesInsAct } from './proc-anotaciones-ins-act';

describe('ProcAnotacionesInsAct', () => {
  let component: ProcAnotacionesInsAct;
  let fixture: ComponentFixture<ProcAnotacionesInsAct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcAnotacionesInsAct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcAnotacionesInsAct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

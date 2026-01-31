import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipdoc } from './par-tipdoc';

describe('ParTipdoc', () => {
  let component: ParTipdoc;
  let fixture: ComponentFixture<ParTipdoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipdoc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipdoc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

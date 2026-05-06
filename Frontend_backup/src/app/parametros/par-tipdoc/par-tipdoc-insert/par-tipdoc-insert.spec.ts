import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParTipdocIns } from './par-tipdoc-insert';

describe('ParTipdocInsert', () => {
  let component: ParTipdocIns;
  let fixture: ComponentFixture<ParTipdocIns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipdocIns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipdocIns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

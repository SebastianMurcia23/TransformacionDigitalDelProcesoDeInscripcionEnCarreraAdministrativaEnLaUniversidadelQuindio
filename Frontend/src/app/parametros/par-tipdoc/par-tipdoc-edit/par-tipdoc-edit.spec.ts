import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParTipdocEdit } from './par-tipdoc-edit';


describe('ParTipdocEdit', () => {
  let component: ParTipdocEdit;
  let fixture: ComponentFixture<ParTipdocEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParTipdocEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParTipdocEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

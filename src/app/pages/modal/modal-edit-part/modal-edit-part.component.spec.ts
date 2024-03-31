import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPartComponent } from './modal-edit-part.component';

describe('ModalEditPartComponent', () => {
  let component: ModalEditPartComponent;
  let fixture: ComponentFixture<ModalEditPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditPartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

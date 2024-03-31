import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteMultiplePartsComponent } from './modal-delete-multiple-parts.component';

describe('ModalDeleteMultiplePartsComponent', () => {
  let component: ModalDeleteMultiplePartsComponent;
  let fixture: ComponentFixture<ModalDeleteMultiplePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteMultiplePartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteMultiplePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

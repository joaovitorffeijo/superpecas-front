import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteMultipleCarComponent } from './modal-delete-multiple-car.component';

describe('ModalDeleteMultipleCarComponent', () => {
  let component: ModalDeleteMultipleCarComponent;
  let fixture: ComponentFixture<ModalDeleteMultipleCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteMultipleCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteMultipleCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

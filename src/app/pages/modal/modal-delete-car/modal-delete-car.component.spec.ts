import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCarComponent } from './modal-delete-car.component';

describe('ModalDeleteCarComponent', () => {
  let component: ModalDeleteCarComponent;
  let fixture: ComponentFixture<ModalDeleteCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDeleteCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDeleteCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

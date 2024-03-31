import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../../../core/model/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/service/car.service';

@Component({
  selector: 'app-modal-add-car',
  templateUrl: './modal-add-car.component.html',
  styleUrl: './modal-add-car.component.scss'
})
export class ModalAddCarComponent {
  modalRef?: NgbModalRef;
  modalSize: string = "md";

  newCar?: Car;

  carForm?: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private carService: CarService,
  ) {
    this.carForm = this.formBuilder.group({
      modelName: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      uniqueCode: ['', [Validators.required]],
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.carForm!.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Dado inválido';
  }

  closeFormModal() {
    this.activeModal.dismiss('success');
  }
}

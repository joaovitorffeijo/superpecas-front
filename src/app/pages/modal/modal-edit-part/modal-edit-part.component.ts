import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Part } from '../../../core/model/part';
import { PartService } from '../../../core/service/part.service';
import { catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Car } from '../../../core/model/car';
import { CarService } from '../../../core/service/car.service';

@Component({
  selector: 'app-modal-edit-part',
  templateUrl: './modal-edit-part.component.html',
  styleUrls: ['./modal-edit-part.component.scss']
})
export class ModalEditPartComponent {
  @Input() part!: Part;
  manufacturers: string[] = [];
  cars: Car[] = [];

  partForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private partService: PartService,
    private carService: CarService,
  ) {}

  ngOnInit() {
    this.partForm = this.formBuilder.group({
      name: [this.part.name, [Validators.required]],
      description: [this.part.description],
      serialNumber: [this.part.serialNumber, [Validators.required]],
      manufacturer: [this.part.manufacturer, [Validators.required]],
      carModel: [this.part.carModel, [Validators.required]],
      carId: [this.part.carId, [Validators.required]],
    });

    this.getData();
  }

  getData(): void {
    this.getManufacturers();
    this.getAllCars();
  }

  getManufacturers(): void {
    this.partService.getAllManufacturers().subscribe(
      (response: any) => {
        this.manufacturers = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllCars(): void {
    this.carService.getAllCars().subscribe(
      (response: any) => {
        this.cars = response.result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  submit(): void {
    if (this.partForm.invalid) { return }

    Swal.fire({
      width: 200,
      padding: 50,
      didOpen: () => {
        Swal.showLoading()
      },
    });

    const updatedPart: Part = {
      id: this.part.id,
      name: this.partForm.value.name!,
      description: this.partForm.value.description,
      serialNumber: this.partForm.value.serialNumber,
      manufacturer: this.partForm.value.manufacturer,
      carModel: this.partForm.value.carModel,
      carId: this.partForm.value.carId,
    };

    this.partService.edit(updatedPart).subscribe(
      () => {
        Swal.close();
        this.dialog('Peça atualizada com sucesso!', 'success');
        this.closeFormModal();
      },
      (error) => {
        Swal.close();
        this.dialog('Erro ao atualizar a peça...', 'error');
        console.error(error);
      }
    );
  }

  getErrorMessage(fieldName: string): string {
    const field = this.partForm!.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Dado inválido';
  }

  closeFormModal() {
    this.activeModal.dismiss('cancel');
  }

  dialog(message: string, type: string) {
    Swal.fire({
      title: message,
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  onLoader() {
    Swal.fire({
      width: 200,
      padding: 50,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }
}
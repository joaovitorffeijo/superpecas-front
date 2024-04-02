import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../../../core/model/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/service/car.service';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiResponse } from '../../../core/model/apiResponse';

@Component({
  selector: 'app-modal-add-car',
  templateUrl: './modal-add-car.component.html',
  styleUrl: './modal-add-car.component.scss'
})
export class ModalAddCarComponent {
  modalRef?: NgbModalRef;

  newCar?: Car;
  manufacturers: string[] = [];

  carForm: FormGroup;

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

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    forkJoin([
      this.getManufacturers(),
    ]).subscribe(() => {
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getManufacturers(): Observable<any> {
    return this.carService.getAllManufacturers().pipe(
      tap((response: any) => {
        this.manufacturers = response.result;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  submit(): void {
    if (this.carForm.invalid) { return }

    this.onLoader();

    this.newCar = {
      modelName: this.carForm.value.modelName!,
      manufacturer: this.carForm.value.manufacturer!,
      uniqueCode: this.carForm.value.uniqueCode!,
    }

    this.carService.save(this.newCar).pipe(
      tap(
        (res) => {
          Swal.close();
          this.dialog('Carro adicionado com sucesso!', 'success');
        }
      ),
      catchError(
        (error) => {
          Swal.close();
          this.dialog('Erro ao adicionar o carro...', 'error');
          throw error;
        }
      )
    ).subscribe(
      () => this.closeFormModal(),
    );
  }

  getErrorMessage(fieldName: string): string {
    const field = this.carForm!.get(fieldName);
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

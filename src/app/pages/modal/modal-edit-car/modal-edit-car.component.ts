import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../../../core/model/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../core/service/car.service';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-car',
  templateUrl: './modal-edit-car.component.html',
  styleUrls: ['./modal-edit-car.component.scss']
})
export class ModalEditCarComponent {
  @Input() car!: Car;
  manufacturers: string[] = [];
  carForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private carService: CarService,
  ) {}

  ngOnInit() {
    this.carForm = this.formBuilder.group({
      modelName: [this.car ? this.car.modelName : '', [Validators.required]],
      manufacturer: [this.car ? this.car.manufacturer : '', [Validators.required]],
      uniqueCode: [this.car ? this.car.uniqueCode : '', [Validators.required]],
    });

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

    this.car.modelName = this.carForm.value.modelName;
    this.car.manufacturer = this.carForm.value.manufacturer;
    this.car.uniqueCode = this.carForm.value.uniqueCode;

    this.onLoader();

    this.carService.edit(this.car).pipe(
      tap(
        (res) => {
          Swal.close();
          this.dialog('Carro atualizado com sucesso!', 'success');
        }
      ),
      catchError(
        (error) => {
          Swal.close();
          this.dialog('Erro ao atualizar o carro...', 'error');
          throw error;
        }
      )
    ).subscribe(
      () => this.closeFormModal(),
    );
  }

  getErrorMessage(fieldName: string): string {
    const field = this.carForm.get(fieldName);
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

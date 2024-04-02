import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Part } from '../../../core/model/part';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartService } from '../../../core/service/part.service';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Car } from '../../../core/model/car';
import { CarService } from '../../../core/service/car.service';

@Component({
  selector: 'app-modal-add-part',
  templateUrl: './modal-add-part.component.html',
  styleUrl: './modal-add-part.component.scss'
})
export class ModalAddPartComponent {
  modalRef?: NgbModalRef;

  newPart?: Part;
  manufacturers: string[] = [];
  cars: Car[] = [];

  partForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private partService: PartService,
    private carService: CarService,
  ) {
    this.partForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      serialNumber: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      carModel: ['', [Validators.required]],
      carId: [0, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    forkJoin([
      this.getManufacturers(),
      this.getAllCars(),
    ]).subscribe(() => {
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getManufacturers(): Observable<any> {
    return this.partService.getAllManufacturers().pipe(
      tap((response: any) => {
        this.manufacturers = response.result;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getAllCars(): Observable<any> {
    return this.carService.getAllCars().pipe(
      tap((response: any) => {
        this.cars = response.result;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  submit(): void {
    if (this.partForm.invalid) { return }

    this.onLoader();

    this.newPart = {
      name: this.partForm.value.name!,
      description: this.partForm.value.description,
      serialNumber: this.partForm.value.serialNumber,
      manufacturer: this.partForm.value.manufacturer,
      carModel: this.partForm.value.carModel,
      carId: this.partForm.value.carId,
    }

    this.partService.save(this.newPart!).pipe(
      tap(
        (res) => {
          Swal.close();
          this.dialog('Peça adicionada com sucesso!', 'success');
        }
      ),
      catchError(
        (error) => {
          Swal.close();
          this.dialog('Erro ao adicionar a Peça...', 'error');
          throw error;
        }
      )
    ).subscribe(
      () => this.closeFormModal(),
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

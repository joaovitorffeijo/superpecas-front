// modal-delete-car.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from '../../../core/model/car';
import { CarService } from '../../../core/service/car.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-modal-delete-car',
  templateUrl: './modal-delete-car.component.html',
  styleUrls: ['./modal-delete-car.component.scss']
})
export class ModalDeleteCarComponent {
  @Input() car!: Car;

  constructor(
    public activeModal: NgbActiveModal,
    private carService: CarService,
  ) { }

  confirmDelete(): void {
    this.onLoader();

    this.carService.delete(this.car.id!).pipe(
      tap(
        (res) => {
          Swal.close();
          this.dialog('Carro deletado com sucesso!', 'success');
        }
      ),
      catchError(
        (error) => {
          Swal.close();
          this.dialog('Erro ao deletar o carro...', 'error');
          throw error;
        }
      )
    ).subscribe(
      () => this.closeFormModal(),
    );
  }

  closeFormModal() {
    this.activeModal.dismiss('cancel');
  }

  dialog(message: string, type: string) {
    Swal.fire({
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  onLoader() {
    Swal.fire({
      width: 200,
      padding: 50,
      didOpen: () => {
        Swal.showLoading()
      },
    });
  }
}

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Part } from '../../../core/model/part';
import { PartService } from '../../../core/service/part.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-modal-delete-part',
  templateUrl: './modal-delete-part.component.html',
  styleUrls: ['./modal-delete-part.component.scss']
})
export class ModalDeletePartComponent {
  @Input() part!: Part;

  constructor(
    public activeModal: NgbActiveModal,
    private partService: PartService,
  ) { }

  confirmDeletePart(): void {
    this.partService.delete(this.part.id!).pipe(
      tap(
        (res) => {
          Swal.close();
          this.dialog('Peça deletada com sucesso!', 'success');
        }
      ),
      catchError(
        (error) => {
          Swal.close();
          this.dialog('Erro ao deletar a peça...', 'error');
          throw error;
        }
      )
    ).subscribe(
      () => this.closeDeletePartModal(),
    );
  }

  closeDeletePartModal() {
    this.activeModal.dismiss('cancel');
  }

  dialog(message: string, type: string) {
    Swal.fire({
      title: message,
      showConfirmButton: false,
      timer: 2000
    });
  }
}

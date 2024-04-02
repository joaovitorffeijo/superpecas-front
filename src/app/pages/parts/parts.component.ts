import { Component } from '@angular/core';
import { Part } from '../../core/model/part';
import { PartService } from '../../core/service/part.service';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import { ApiResponse } from '../../core/model/apiResponse';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddPartComponent } from '../modal/modal-add-part/modal-add-part.component';
import { ModalEditPartComponent } from '../modal/modal-edit-part/modal-edit-part.component';
import { ModalDeletePartComponent } from '../modal/modal-delete-part/modal-delete-part.component';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent {

  // data
  parts: Part[] = [];
  name: string = '';

  // page 
  logoShortPath: string = 'assets/img/super-pecas-logo-short-reverse.png';
  isLoading: boolean = true;

  // paginator
  size: number = 10;
  page: number = 0;
  totalElements: number = 0;

  // modal
  modalRef?: NgbModalRef;
  modalSize: string = 'md';

  // table
  displayedColumns: string[] = ['id', 'name', 'description', 'serialNumber', 'manufacturer', 'carModel', 'actions'];

  constructor(
    private modalService: NgbModal,
    private partService: PartService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    forkJoin([
      this.getParts(),
    ]).subscribe(() => {
        this.changeLoadingValue();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getParts(): Observable<any> {
    return this.partService.getAllByPage(this.name, this.size, this.page).pipe(
      tap((response: ApiResponse) => {
        this.parts = response.result.content;
        this.totalElements = response.result.totalElements!;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  searchByPartName(partName: string): void {
    this.changeLoadingValue();

    this.name = partName;
    this.page = 0;

    this.getData();
  }

  onAddPart(): void {
    this.modalRef = this.modalService.open(ModalAddPartComponent);
    this.modalSuccess(this.modalRef);
  }

  onEditPart(part: Part): void {
    this.modalRef = this.modalService.open(ModalEditPartComponent);
    this.modalRef.componentInstance.part = part;
    this.modalSuccess(this.modalRef);
  }  

  onDeletePart(part: Part): void {
    this.modalRef = this.modalService.open(ModalDeletePartComponent);
    this.modalRef.componentInstance.part = part;
    this.modalSuccess(this.modalRef);
  }

  modalSuccess(modalRef: NgbModalRef): void {
    this.modalRef!.result.then(
      (result) => { },
      (reason) => {
        if (reason === 'cancel') {
          this.changeLoadingValue();
          this.getData();
        }
      }
    );
  }

  onPageChange(event: any): void {
    this.changeLoadingValue();

    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.getData();
  }

  changeLoadingValue(): void {
    this.isLoading = !this.isLoading;
  }
}

import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/service/car.service';
import { Car } from '../../core/model/car';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import { ApiResponse } from '../../core/model/apiResponse';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddCarComponent } from '../modal/modal-add-car/modal-add-car.component';
import { ModalEditCarComponent } from '../modal/modal-edit-car/modal-edit-car.component';
import { ModalDeleteCarComponent } from '../modal/modal-delete-car/modal-delete-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {

  // data
  cars: Car[] = [];
  modelName: string = '';

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
  displayedColumns: string[] = ['id', 'modelName', 'manufacturer', 'uniqueCode', 'actions'];

  constructor(
    private modalService: NgbModal,
    private carService: CarService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    forkJoin([
      this.getCars(),
    ]).subscribe(() => {
        this.changeLoadingValue();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCars(): Observable<any> {
    return this.carService.getAllByPage(this.modelName, this.size, this.page).pipe(
      tap((response: ApiResponse) => {
        this.cars = response.result.content;
        this.totalElements = response.result.totalElements!;
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  searchByModelName(modelName: string): void {
    this.changeLoadingValue();

    this.modelName = modelName;
    this.page = 0;

    this.getData();
  }

  onAdd(): void {
    this.modalRef = this.modalService.open(ModalAddCarComponent);
    this.modalSuccess(this.modalRef);
  }

  onEdit(car: Car): void {
    this.modalRef = this.modalService.open(ModalEditCarComponent);
    this.modalRef.componentInstance.car = car;
    this.modalSuccess(this.modalRef);
  }  

  onDelete(car: Car): void {
    this.modalRef = this.modalService.open(ModalDeleteCarComponent);
    this.modalRef.componentInstance.car = car;
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

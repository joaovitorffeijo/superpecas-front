import { Component, OnInit } from '@angular/core';
import { CarService } from '../../core/service/car.service';
import { Car } from '../../core/model/car';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import { ApiResponse } from '../../core/model/apiResponse';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  cars: Car[] = [];

  // page control
  isLoading: boolean = true;

  // paginator
  size: number = 10;
  page: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  last: boolean = false;
  numberOfElements: number = 0;
  first: boolean = true;
  number: number = 0;

  constructor(
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
    return this.carService.getAllByPage(this.size, this.page).pipe(
      tap((response: ApiResponse) => {
        this.cars = response.result.content;
        this.totalElements = response.result.totalElements!;
        this.totalPages = response.result.totalPages!;
        this.last = response.result.last!;
        this.numberOfElements = response.result.numberOfElements!;
        this.first = response.result.first!;
        this.number = response.result.number!;  
      }),
      catchError((error: any) => {
        throw error;
      })
    );
  }

  changeLoadingValue(): void {
    this.isLoading = !this.isLoading;
  }
}

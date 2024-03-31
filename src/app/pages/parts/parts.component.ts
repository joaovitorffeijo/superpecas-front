import { Component } from '@angular/core';
import { Part } from '../../core/model/part';
import { PartService } from '../../core/service/part.service';
import { Observable, catchError, forkJoin, tap } from 'rxjs';
import { ApiResponse } from '../../core/model/apiResponse';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent {
  parts: Part[] = [];

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
    private partService: PartService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    forkJoin([
      this.getParts(),
    ]).subscribe(() => {
        this.changeLoadingValue();
        console.log(this.parts);
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getParts(): Observable<any> {
    return this.partService.getAllByPage(this.size, this.page).pipe(
      tap((response: ApiResponse) => {
        this.parts = response.result.content;
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

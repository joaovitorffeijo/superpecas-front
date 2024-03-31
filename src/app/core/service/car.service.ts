import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {

  path: string = 'api/car'

  constructor(
    private http: HttpClient
  ) { }

  getAllByPage(modelName: string, size: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('modelName', `${modelName}`)
      .set('size', `${size}`)
      .set('page', `${page}`);

    return this.http.get(`${environment.apiUrl}/${this.path}/page`, { params }).pipe(first());
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.path}/${id}`);
  }

  save(car: Car) {
    return this.http.post(`${environment.apiUrl}/${this.path}/`, car);
  }

  edit(car: Car) {
    return this.http.put(`${environment.apiUrl}/${this.path}/`, car);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${this.path}/${id}`);
  }

  deleteMultiple(ids: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${this.path}/${ids}`);
  }
}
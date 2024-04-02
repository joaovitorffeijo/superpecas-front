import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Part } from '../model/part';

@Injectable({
  providedIn: 'root',
})
export class PartService {

  path: string = 'api/part'

  constructor(
    private http: HttpClient
  ) { }

  getAllByPage(name: string, size: number, page: number): Observable<any> {
    const params = new HttpParams()
      .set('name', `${name}`)
      .set('size', `${size}`)
      .set('page', `${page}`);

    return this.http.get(`${environment.apiUrl}/${this.path}/page`, { params }).pipe(first());
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.path}/${id}`);
  }

  getAllManufacturers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.path}/manufactures`);
  }

  save(part: Part) {
    return this.http.post(`${environment.apiUrl}/${this.path}/`, part);
  }

  edit(part: Part) {
    return this.http.put(`${environment.apiUrl}/${this.path}/`, part);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${this.path}/${id}`);
  }

  deleteMultiple(ids: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${this.path}/${ids}`);
  }
}
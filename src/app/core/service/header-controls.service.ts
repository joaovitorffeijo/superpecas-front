import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadControlsService {
  private selectedForDelete = new BehaviorSubject<any[]>([]);

  setSelectedForDelete(value: any[]) {
    this.selectedForDelete.next(value);
  }

  getSelectedForDelete(): Observable<any[]> {
    return this.selectedForDelete.asObservable();
  }

  clearData() {
    this.selectedForDelete.next([]);
  }
}
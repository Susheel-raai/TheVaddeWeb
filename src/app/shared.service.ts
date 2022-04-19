import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private itemFilter = new Subject<any>();

  filteredItem = this.itemFilter.asObservable();
  constructor() { }

  setFilter(itemFilter: any) {
    this.itemFilter.next(itemFilter);
  }
  
  getFilter(): Observable<any> {
    return this.itemFilter.asObservable();
  }
}

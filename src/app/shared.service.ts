import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private ItemsList = new BehaviorSubject<any>({});
  private FilterItems = new BehaviorSubject<string>('');
  foodItemsList = this.ItemsList.asObservable();
  constructor() { }

  setList(ItemsList: any) {
    this.ItemsList.next(ItemsList);
  }

  setgFilter(FilterItems: string) {
    this.ItemsList.next(FilterItems);
  }
}

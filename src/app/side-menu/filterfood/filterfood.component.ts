import { Component, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './../../shared.service';
import { Subscription } from 'rxjs';
import { FoodItems } from '../../../Models/foodItems';

@Component({
  selector: 'app-filterfood',
  templateUrl: './filterfood.component.html',
  styleUrls: ['./filterfood.component.css']
})
export class FilterfoodComponent implements OnInit {
  public filteredItemsList: any;
  public breakItemsList: any;
  public lunchItemsList: any;
  public dinnerItemsList: any;
  public foodItemList: any = [];
  public selectItemsList: FoodItems[] = localStorage.getItem('SelectedfoodItem') == null ? [] : JSON.parse(localStorage.getItem('SelectedfoodItem') || '{}');
  itemfiltered: any;
  subscription!: Subscription;
  constructor(private router: Router, private sharedservice: SharedService) {
    this.subscription = this.sharedservice.getFilter().subscribe(value => this.itemfiltered = value);
  }

  ngOnInit(): void {
    debugger;
    this.filteredItemsList = JSON.parse(localStorage.getItem('filterItemsList') || '{}');
    localStorage.removeItem('SelectedfoodItem');
  }

  /*getFilteredItems() {
    this.filteredItemsList = JSON.parse(localStorage.getItem('filterItemsList') || '{}');
    /*this.filterItems == 'BreakFast' ? this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'BreakFast') :
      this.filterItems == 'Lunch' ? this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'Lunch') :
        this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'Dinner')
  }*/

  removeItemCount(itemid: number) {
    this.filteredItemsList = this.filteredItemsList.map((foodItem: FoodItems) => {
      if (foodItem.itemId === itemid) {
        if (this.selectItemsList.find((x: { itemId: number; }) => x.itemId === itemid)) {
          foodItem.itemQty = foodItem.itemQty > 0 ? foodItem.itemQty - 1 : 0
          let index = this.selectItemsList.findIndex(x => x.itemId === itemid)
          this.selectItemsList[index].itemQty = foodItem.itemQty;
        }
        localStorage.setItem('SelectedfoodItem', JSON.stringify(this.selectItemsList));
        return {
          ...foodItem,
          itemQty: foodItem.itemQty
        }
      }
      return foodItem;
    })
  }

  addItemCount(itemid: number) {
    this.filteredItemsList = this.filteredItemsList.map((foodItem: FoodItems) => {
      if (foodItem.itemId === itemid) {
        if (this.selectItemsList.find((x: { itemId: number; }) => x.itemId === itemid)) {
          foodItem.itemQty = foodItem.itemQty + 1;
          let index = this.selectItemsList.findIndex(x => x.itemId === itemid)
          this.selectItemsList[index].itemQty = foodItem.itemQty;
        }
        else {
          foodItem.itemQty = foodItem.itemQty + 1;
          this.selectItemsList.push(foodItem);
        }
        localStorage.setItem('allItems', JSON.stringify(this.filteredItemsList));
        localStorage.setItem('SelectedfoodItem', JSON.stringify(this.selectItemsList));
        return {
          ...foodItem,
          itemQty: foodItem.itemQty
        }
      }
      return foodItem;
    })
  }
}

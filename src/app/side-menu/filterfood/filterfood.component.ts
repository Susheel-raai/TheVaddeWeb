import { Component, Input, OnInit } from '@angular/core';
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
  public filterItems: any;
  public selectItemsList: FoodItems[] = localStorage.getItem('SelectedfoodItem') == null ? [] : JSON.parse(localStorage.getItem('SelectedfoodItem') || '{}');
  itemfiltered: any;
  subscription!: Subscription;
  constructor(private router: Router, private sharedservice: SharedService) {
    this.subscription = this.sharedservice.getFilter().subscribe(value => this.itemfiltered = value);
  }

  ngOnInit(): void {
    this.filterItems = localStorage.getItem('filterItem');
    this.getFilteredItems();
    localStorage.removeItem('SelectedfoodItem');
  }

  getFilteredItems() {
    debugger;
    this.filteredItemsList = JSON.parse(localStorage.getItem('filterItemsList') || '{}');
    /*this.filterItems == 'Breakfast' ? this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'Breakfast') :
      this.filterItems == 'Lunch' ? this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'Lunch') :
        this.filteredItemsList = this.filteredItemsList.filter((x: { itemType: string; }) => x.itemType == 'Dinner')*/
  }

  removeItemCount(itemid: number) {
    debugger
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
    debugger
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

  /*reloadCurrentRoute() {
     debugger;
     let currentUrl = this.router.url;
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
       this.router.navigate([currentUrl]);
     });
   }*/
}

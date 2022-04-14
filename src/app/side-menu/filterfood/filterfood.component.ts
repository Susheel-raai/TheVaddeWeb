import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filterfood',
  templateUrl: './filterfood.component.html',
  styleUrls: ['./filterfood.component.css']
})
export class FilterfoodComponent implements OnInit {
  public filteredItemsList:any;
  public foodItemList:any=[];
  filterItems: any;
  constructor( private router:Router) { }

  ngOnInit(): void {
    this.filterItems = localStorage.getItem('filterItem');
    this.getFilteredItems();
  }

  getFilteredItems(){
    debugger;
    this.filteredItemsList=JSON.parse(localStorage.getItem('filterItemsList') ||'{}');
    this.filterItems=='Breakfast'?this.filteredItemsList = this.filteredItemsList.filter((x:{itemType : string;})=>x.itemType=='Breakfast'):
    this.filterItems=='Lunch'?this.filteredItemsList = this.filteredItemsList.filter((x:{itemType : string;})=>x.itemType=='Lunch'):
    this.filteredItemsList = this.filteredItemsList.filter((x:{itemType : string;})=>x.itemType=='Dinner')
  }

  reloadCurrentRoute() {
    debugger;
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
  
}

import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-filterfood',
  templateUrl: './filterfood.component.html',
  styleUrls: ['./filterfood.component.css']
})
export class FilterfoodComponent implements OnInit {
  public Breakfastlist:any=[];
  public foodItemList:any=[];
  filterItems: any;
  constructor(private shareData: SharedService) { }

  ngOnInit(): void {
    this.filterItems = localStorage.getItem('filterItem');
    this.getFilteredItems();
  }

  getFilteredItems(){
    this.shareData.foodItemsList.subscribe(data=>
    this.Breakfastlist=data);
    this.filterItems=='Breakfast'?this.Breakfastlist = this.Breakfastlist.filter((x:{itemType : string;})=>x.itemType=='Breakfast'):
    this.filterItems=='Lunch'?this.Breakfastlist = this.Breakfastlist.filter((x:{itemType : string;})=>x.itemType=='Lunch'):
    this.Breakfastlist = this.Breakfastlist.filter((x:{itemType : string;})=>x.itemType=='Dinner')
  }
}

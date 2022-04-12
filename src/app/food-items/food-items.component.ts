import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs/internal/Subscription';
import * as $ from 'jquery';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.css']
})
export class FoodItemsComponent implements OnInit {

  private routes!: Subscription;
  public foodItemList:any=[];
  constructor(private commonService : CommonService) { }

  ngOnInit(): void {
    debugger
    this.getAllItems();
  //Toggle Click Function
  $("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
  });
  }
  
  getAllItems()
  {
   var observable = this.commonService.Get('/FoodItems/GetAllFoodItemDetails');
   if(observable!= undefined)
   {
     this.routes=observable.subscribe(data=>{
      this.foodItemList = data;
     })
   }
  }
}

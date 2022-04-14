import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../common.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private routes!: Subscription;
  public foodItemList:any=[];
  public startlist:any=[];
  public fooditemReview: any=[];
  constructor(private commonService : CommonService, private shareData:SharedService) { }
  

  ngOnInit(): void {
    debugger
    this.getAllItems();
  }

  getAllItems()
  {
   var observable = this.commonService.Get('/FoodItems/GetAllFoodItemDetails');
   if(observable!= undefined)
   {
     this.routes=observable.subscribe(data=>{
      this.foodItemList = data;
      this.shareData.setList(this.foodItemList);
     })
   }
  }
}

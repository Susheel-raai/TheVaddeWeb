import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../common.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private routes!: Subscription;
  public foodItemList: any;
  public topItemList: any = [];
  public startlist: any = [];
  public fooditemReview: any = [];
  public item = {};
  itemfiltered: any;
  subscription!: Subscription;
  constructor(private commonService: CommonService, private sharedservice: SharedService) {
    this.subscription = this.sharedservice.getFilter().subscribe(value => this.itemfiltered = value);
  }


  ngOnInit(): void {
    
    this.getAllItems();
  }

  getAllItems() {
    var observable = this.commonService.Get('/FoodItems/GetAllFoodItemDetails');
    if (observable != undefined) {
      this.routes = observable.subscribe(data => {
        this.foodItemList = data;
        localStorage.setItem('filterItemsList', JSON.stringify(this.foodItemList));
        this.topItemList = this.foodItemList.filter((x: { itemReview: number; }) => x.itemReview == 5)
      })
    }
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilterfoodComponent } from './filterfood/filterfood.component';
import { SharedService } from './../shared.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  panelOpenState = false;
  itemFilter!: string;
  //filterItemTypes!:string;
  constructor(private router: Router, private sharedservice: SharedService) { }

  ngOnInit(): void {
  }

  /*onFilterFoodItems(value:string){
   
    localStorage.setItem('filterItem',value);
    let filterItemObj = new FilterfoodComponent(this.router, this.sharedservice);
    this.router.navigate(['/menu']);
    if(this.router.url=='/menu'){
      filterItemObj.reloadCurrentRoute();
    }
  }*/

  modelChangeFn(value: any) {
   
    this.itemFilter = value;
    this.sharedservice.setFilter(this.itemFilter);
  }
}

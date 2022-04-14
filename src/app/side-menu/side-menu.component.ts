import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {FilterfoodComponent} from './filterfood/filterfood.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  panelOpenState = false;
  filterItem!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFilterFoodItems(value:string){
    debugger;
    localStorage.setItem('filterItem',value);
    let filterItemObj = new FilterfoodComponent(this.router);
    this.router.navigate(['/menu']);
    if(this.router.url=='/menu'){
      filterItemObj.reloadCurrentRoute();
    }
  }
}

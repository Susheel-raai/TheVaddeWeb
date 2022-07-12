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
  ItemCount:any;
  constructor(private router: Router, private sharedservice: SharedService) { }

  ngOnInit(): void {
    debugger;
    this.ItemCount = localStorage.getItem('SelectedfoodItem')==null? 0 : JSON.parse(localStorage.getItem('SelectedfoodItem')||'{}');
    this.ItemCount = this.ItemCount.filter((x: { itemQty: number; }) => x.itemQty != 0);
    this.ItemCount = this.ItemCount.length;
  }

  modelChangeFn(value: any) {
    this.itemFilter = value;
    this.sharedservice.setFilter(this.itemFilter);
  }
}

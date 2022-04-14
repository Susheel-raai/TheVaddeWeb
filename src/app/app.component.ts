import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  panelOpenState = false;

  onFilterFoodItems(value:string){
    debugger;
    localStorage.setItem('filterItem',value);
  }
}

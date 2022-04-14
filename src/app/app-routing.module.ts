import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { FilterfoodComponent } from './filterfood/filterfood.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home',component: HomeComponent },
  {path: 'foodItems', component: FoodItemsComponent},
  {path: 'filter', component : FilterfoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

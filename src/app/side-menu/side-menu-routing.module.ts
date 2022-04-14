import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilterfoodComponent} from './filterfood/filterfood.component';
import {AboutComponent} from './about/about.component';
import { ContactComponent} from './contact/contact.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path :'home', component:HomeComponent},
  {path :'menu', component : FilterfoodComponent},
  {path :'foodItems', component : FilterfoodComponent},
  {path: 'About us', component: AboutComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }

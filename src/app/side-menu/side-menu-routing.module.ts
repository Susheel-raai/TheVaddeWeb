import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilterfoodComponent} from './filterfood/filterfood.component';
import {AboutComponent} from './about/about.component';
import { ContactComponent} from './contact/contact.component';
import { UserComponent} from './user/user.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path :'home', component:HomeComponent},
  {path :'menu', component : FilterfoodComponent, data:{ state:''}},
  {path :'foodItems', component : FilterfoodComponent},
  {path: 'About us', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'user', component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }

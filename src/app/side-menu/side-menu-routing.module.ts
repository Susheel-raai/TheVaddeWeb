import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilterfoodComponent} from './filterfood/filterfood.component';
import { UserComponent} from './user/user.component';
import { HelpComponent } from './help/help.component';
import { CartComponent} from './cart/cart.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path :'home', component:HomeComponent},
  {path :'menu', component : FilterfoodComponent, data:{ state:''}},
  {path :'foodItems', component : FilterfoodComponent},
  {path: 'user', component:UserComponent},
  {path: 'help', component:HelpComponent},
  {path: 'cart', component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideMenuRoutingModule { }

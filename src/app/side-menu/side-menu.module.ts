import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SideMenuRoutingModule } from './side-menu-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FilterfoodComponent } from './filterfood/filterfood.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    FilterfoodComponent,
    UserComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SideMenuRoutingModule,
    Ng2SearchPipeModule,
    MatCardModule,
    MatTooltipModule,
    RatingModule
  ],
  exports:
  [FilterfoodComponent]
})
export class SideMenuModule { }

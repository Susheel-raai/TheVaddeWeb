import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SideMenuRoutingModule } from './side-menu-routing.module';
import { AboutComponent } from './about/about.component';
import { FilterfoodComponent } from './filterfood/filterfood.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ToastrModule } from 'ngx-toastr';
import {MatExpansionModule} from '@angular/material/expansion';
import { HelpComponent } from './help/help.component';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    FilterfoodComponent,
    UserComponent,
    HelpComponent,
    CartComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SideMenuRoutingModule,
    Ng2SearchPipeModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    RatingModule,
    MatSnackBarModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatExpansionModule,
    MatTableModule,
    TextMaskModule
  ],
  exports:
  [FilterfoodComponent],
  providers:[DatePipe]
})
export class SideMenuModule { }

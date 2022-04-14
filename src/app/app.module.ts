import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodItemsComponent } from './food-items/food-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {HomeComponent} from './home/home.component';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FilterfoodComponent } from './filterfood/filterfood.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodItemsComponent,
    HomeComponent,
    FilterfoodComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatTooltipModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

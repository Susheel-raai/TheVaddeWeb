import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SideMenuRoutingModule } from './side-menu-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SideMenuRoutingModule,
    Ng2SearchPipeModule
  ]
})
export class SideMenuModule { }

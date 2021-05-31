import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent  
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MatProgressSpinnerModule,
    CarouselModule.forRoot(),
    FlexLayoutModule
  ]
})
export class ShopModule { }

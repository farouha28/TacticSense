import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SponsorsListComponent } from './sponsors-list/sponsors-list.component';


@NgModule({
  declarations: [
    SponsorsListComponent
  ],
  imports: [
    CommonModule,
    SponsorsRoutingModule
  ]
})
export class SponsorsModule { }

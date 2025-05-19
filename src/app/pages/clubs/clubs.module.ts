import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsListComponent } from './clubs-list/clubs-list.component';


@NgModule({
  declarations: [
    ClubsListComponent
  ],
  imports: [
    CommonModule,
    ClubsRoutingModule
  ]
})
export class ClubsModule { }

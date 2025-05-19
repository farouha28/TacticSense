import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { CoachesListComponent } from './coaches-list/coaches-list.component';


@NgModule({
  declarations: [
    CoachesListComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule
  ]
})
export class CoachesModule { }

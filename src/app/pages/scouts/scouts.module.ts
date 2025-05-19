import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoutsRoutingModule } from './scouts-routing.module';
import { ScoutsListComponent } from './scouts-list/scouts-list.component';


@NgModule({
  declarations: [
    ScoutsListComponent
  ],
  imports: [
    CommonModule,
    ScoutsRoutingModule
  ]
})
export class ScoutsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule,
  NbSelectModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbListModule,
  NbTagModule
} from '@nebular/theme';

import { SponsorsListComponent } from './sponsors-list/sponsors-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbBadgeModule,
    NbListModule,
    NbTagModule,
    RouterModule.forChild([
      {
        path: '',
        component: SponsorsListComponent,
      },
    ]),
  ],
  declarations: [
    SponsorsListComponent,
  ],
})
export class SponsorsModule { }


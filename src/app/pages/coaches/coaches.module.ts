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
  NbUserModule,
  NbSpinnerModule,
  NbBadgeModule
} from '@nebular/theme';

import { CoachesListComponent } from './coaches-list/coaches-list.component';

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
    NbUserModule,
    NbSpinnerModule,
    NbBadgeModule,
    RouterModule.forChild([
      {
        path: '',
        component: CoachesListComponent,
      },
    ]),
  ],
  declarations: [
    CoachesListComponent,
  ],
})
export class CoachesModule { }


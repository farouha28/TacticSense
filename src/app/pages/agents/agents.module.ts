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
  NbBadgeModule,
  NbListModule,
  NbTagModule
} from '@nebular/theme';

import { AgentsListComponent } from './agents-list/agents-list.component';

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
    NbListModule,
    NbTagModule,
    RouterModule.forChild([
      {
        path: '',
        component: AgentsListComponent,
      },
    ]),
  ],
  declarations: [
    AgentsListComponent,
  ],
})
export class AgentsModule { }



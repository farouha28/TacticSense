import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule, 
  NbSelectModule,
  NbSpinnerModule,
  NbProgressBarModule,
  NbPopoverModule,
  NbDialogModule
} from '@nebular/theme';

import { PlayersListComponent } from './players-list/players-list.component';

@NgModule({
  declarations: [
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: PlayersListComponent
      }
    ]),
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSpinnerModule,
    NbProgressBarModule,
    NbPopoverModule,
    NbDialogModule.forChild()
  ]
})
export class PlayersModule { }


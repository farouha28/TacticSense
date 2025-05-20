import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule,
  NbUserModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CoachesListComponent } from './coaches-list/coaches-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbUserModule,
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


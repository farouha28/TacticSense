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
  NbUserModule,
  NbDialogModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { SponsorsListComponent } from './sponsors-list/sponsors-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbUserModule,
    NbDialogModule.forChild(),
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


